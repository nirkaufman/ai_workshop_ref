# Setup OpenAI

# Step 1: Install openAI
```bash
  npm install openai
```

# Step 2: Get your API key
  - Go to https://platform.openai.com/account/api-keys
  - Create a new API key

# Step 3: Create a .env file
  - Create a .env file in the root of your project
  - Add your API key to the .env file
  ```bash
    OPENAI_API_KEY=your-api-key
```

# Step 4 install dotenv
```bash
  npm install dotenv
```

# Step 5: Create a simple chat
  - Create a new file called chat.ts
  - Initialize the OpenAI class with your API key
  
  ```typescript
    import OpenAI from "openai";
    import 'dotenv/config';

    const openAi = new OpenAI();

    const response = openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an HR assistant. You are helping a tech human resource professional to hire candidates.",
        },
        {
          role: "user",
          content: "Hi!",
        },
      ],
    })


response.then((res) => {
  console.log(res.choices[0].message.content);
})

  ```
