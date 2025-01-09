const SYSTEM_PROMPT = `You are a helpful chef assistant. When given a list of ingredients, suggest ONE clear recipe that uses those ingredients. Your response should be well-structured in markdown format with:
- A title
- A list of ingredients with quantities
- Clear step-by-step instructions
Keep the recipe concise and practical.`;

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function getRecipeFromGemini(
  ingredientsArr: string[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("No API key found!");
    return "Sorry, there was an error with the API configuration.";
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nI have these ingredients: ${ingredientsString}. Please suggest a recipe!`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data: GeminiResponse = await response.json();
    console.log("API Response:", data); // Debug log

    if (data.error) {
      console.error("API Error:", data.error);
      return `Sorry, there was an error: ${data.error.message}`;
    }

    if (!data || !data.candidates || !data.candidates[0]) {
      console.error("Unexpected API response:", data);
      return "Sorry, there was an error with the recipe generation.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("API Error:", err);
    return "Sorry, there was an error generating your recipe. Please try again.";
  }
}
