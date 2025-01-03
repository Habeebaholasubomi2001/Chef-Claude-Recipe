import { HfInference } from "@huggingface/inference";

// Free API - no key required
// const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

// Spoonacular
// https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=YOUR-KEY

const SYSTEM_PROMPT = `You are a helpful chef assistant. When given a list of ingredients, suggest ONE clear recipe that uses those ingredients. Your response should be well-structured in markdown format with:
- A title
- A list of ingredients with quantities
- Clear step-by-step instructions
Keep the recipe concise and practical.`;

const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_API_KEY);

export async function getRecipeFromMistral(ingredientsArr) {
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
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
      temperature: 0.7, // Add temperature for more focused responses
    });

    console.log("API Response:", response); // Debug log
    return response.choices[0].message.content;
  } catch (err) {
    console.error("API Error:", err);
    return "Sorry, there was an error generating your recipe. Please try again.";
  }
}
