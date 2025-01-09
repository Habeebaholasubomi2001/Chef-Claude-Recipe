import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are a helpful chef assistant. When given a list of ingredients, suggest ONE clear recipe that uses those ingredients. Your response should be well-structured in markdown format with:
- A title
- A list of ingredients with quantities
- Clear step-by-step instructions
Keep the recipe concise and practical.`;

const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_API_KEY);

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export async function getRecipeFromMistral(
  ingredientsArr: string[]
): Promise<string> {
  if (!import.meta.env.VITE_HUGGING_FACE_API_KEY) {
    console.error("No API key found!");
    return "Sorry, there was an error with the API configuration.";
  }

  const ingredientsString = ingredientsArr.join(", ");
  console.log("Ingredients being sent:", ingredientsString); // Debug log

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT } as ChatMessage,
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        } as ChatMessage,
      ],
      max_tokens: 1024,
      temperature: 0.7, // Add temperature for more focused responses
    });

    console.log("API Response:", response);
    return response.choices[0].message.content ?? "No response generated";
  } catch (err) {
    console.error("API Error:", err);
    return "Sorry, there was an error generating your recipe. Please try again.";
  }
}
