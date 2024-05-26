import 'dotenv/config'

import OpenAI from "openai";

const openAi = new OpenAI();

// Example dummy function hard coded to return the same weather
// In production, this could be your backend API or an external API
function getCurrentWeather(location: string, unit = "fahrenheit") {
  console.log('getCurrentWeather executed');

  if (location.toLowerCase().includes("tokyo")) {
    return JSON.stringify({location: "Tokyo", temperature: "10", unit: "celsius"});
  } else if (location.toLowerCase().includes("san francisco")) {
    return JSON.stringify({location: "San Francisco", temperature: "72", unit: "fahrenheit"});
  } else if (location.toLowerCase().includes("paris")) {
    return JSON.stringify({location: "Paris", temperature: "22", unit: "fahrenheit"});
  } else {
    return JSON.stringify({location, temperature: "unknown"});
  }
}

function getDistance(source: string, destination: string) {
  // use location services and google map API, and transport API to get the distance
  return JSON.stringify({source, destination, distance: "100 miles"});

}

export async function startConversation(content: string | any[]) {
  // Step 1: send the conversation and available functions to the model
  // example: "What's the weather like in San Francisco, Tokyo, and Paris?"
  const messages: any[] = [];

  const response = await openAi.chat.completions.create({
    model: "gpt-4o",
    messages: [
      ...messages,
      {
        role: "system",
        content: "You are an HR assistant. You are helping a tech human resource professional to hire candidates.",
      },
      {
        role: "user",
        content: content,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_current_weather",
          description: "Get the current weather in a given location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state, e.g. San Francisco, CA",
              },
              unit: {type: "string", enum: ["celsius", "fahrenheit"]},
            },
            required: ["location"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_distance",
          description: "Get the distance between one location to the other",
          parameters: {
            type: "object",
            properties: {
              source: {
                type: "string",
                description: "The destination location, city or state, e.g. Paris",
              },
              destination: {
                type: "string",
                description: "The destination location, city or state, e.g. Tokyo",
              },
            },
            required: ["source", "destination"],
          },
        },
      },
    ],
    // auto is default, but we'll be explicit
    tool_choice: "auto",
  });

  const responseMessage = response.choices[0].message;

  // Step 2: check if the model wanted to call a function
  const toolCalls = responseMessage.tool_calls;

  console.log('responseMessage.tool_calls', responseMessage.tool_calls)


  if (responseMessage.tool_calls) {
    // Step 3: call the function
    //The JSON response may not always be valid! handle errors
    const availableFunctions: Record<string, Function> = {
      // you cn add more functions here
      get_current_weather: getCurrentWeather,
      get_distance: getDistance,
    };

    // extend conversation with assistant's reply
    messages.push(responseMessage);

    for (const toolCall of toolCalls!) {
      const functionName = toolCall.function.name;


      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);

      const functionResponse = functionToCall(
          functionArgs.location,
          functionArgs.unit
      );

      // extend conversation with function response
      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        name: functionName,
        content: functionResponse,
      });
    }

    // get a new response from the model where it can see the function response
    const secondResponse = await openAi.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    return secondResponse.choices[0].message.content;
  }
}
