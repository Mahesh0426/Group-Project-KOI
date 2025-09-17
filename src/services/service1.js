// services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with proper error handling
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateAIlearning_outcomes = async (programDetails) => {
  try {
    // Validate input
    if (!programDetails?.title) {
      throw new Error("Product title is required");
    }

    // system prompt
    const systemPrompt = `You are an AI assistant specializing in writing SEO-friendly program 
 learning outcomes for the STEM Explorers Club. This club is for children aged 8 to 14 passionate 
 about STEM.

Generate exactly 5 program learning outcomes.  
Each outcome must be a single clear sentence with 5-7 words.  
Do not add numbering, bullets, stars, or introductory text.  
Only output plain sentences, each on a new line.  

Example output format:
Understand planetary science and astronomy concepts.
Develop telescope operation and observation skills.
Explore constellations and celestial navigation basics.
Learn about spacecraft design and engineering.
Foster teamwork for collaborative space missions.

Program Details:
- Program Name: \${programDetails.title}
- Age Group: \${programDetails.age_group || "not specified"}
- Duration: \${programDetails.duration || "not specified"}
- Description: \${programDetails.description || "not specified"}
`;

    // Model Configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(systemPrompt);
    const response = result.response;

    // Handle different response structures
    if (response?.text) {
      return response.text().trim();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Unexpected response format from AI");
    }
  } catch (error) {
    console.error("AI description generation failed:", error);
    throw new Error(`Description generation failed: ${error.message}`);
  }
};
