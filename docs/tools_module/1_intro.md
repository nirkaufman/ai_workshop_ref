# Intro to function calls (tools)

# Upgrading AI with tools

- openAi ref: https://platform.openai.com/docs/guides/function-calling?lang=node.js

---

**Going Beyond Traditional AI Capabilities**:

- **Static Knowledge Base**: While LLMs are powerful and have vast knowledge, they're limited by their last training data. Anything after their "knowledge cutoff" is unknown to them.
- **Not Internet-Connected**: LLMs don't actively browse the internet. They can't pull current events, real-time data, or the latest scientific breakthroughs. What they know is static, based on their last update.
- **Dynamic Solution**: To overcome these limitations, we can integrate LLMs with systems that can actively fetch, process, or generate real-time information.

---

**Introduction to Function Calling Using LLMs**:

- **What is Function Calling?**: While LLMs can't actively browse the internet, they can be used in tandem with function calls to other systems that can. Essentially, the LLM instructs another system to perform a specific task and then uses that data in its response.
- **Bridging the Gap**: By integrating LLMs with function calling capabilities, we can bridge the gap between the LLM's static knowledge and the dynamic, ever-evolving real world. For instance, while the LLM might not know today's stock market status, it can instruct a function to fetch that data and then interpret it for the user.

---

**Benefits and Challenges of AI-Driven Function Calling**:

- **Benefits**:
    - **Up-to-Date Responses**: By using function calls, the LLM can provide answers based on the latest available data, even if it's post its last training cut-off.
    - **Enhanced Utility**: LLMs can be integrated into a broader ecosystem of services and APIs, expanding their utility beyond mere text generation.
    - **Customization**: Developers can tailor which functions or services the LLM can call, allowing for a customized user experience.
- **Challenges**:
    - **Complexity**: Introducing function calling adds another layer of complexity to the system. Ensuring smooth interaction between the LLM and external functions can be challenging.
    - **Latency**: Real-time data fetching and processing can introduce delays in the LLM's responses.
    - **Accuracy & Reliability**: The LLM is dependent on the accuracy and reliability of the external functions it calls. If there's an issue with the external data source, it can impact the quality of the LLM's response.
