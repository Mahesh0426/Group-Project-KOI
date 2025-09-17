// services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with proper error handling
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateAIDescription = async (programDetails) => {
  try {
    // Validate input
    if (!programDetails?.title) {
      throw new Error("Product title is required");
    }

    // system prompt
    const systemPrompt = `You are an AI assistant specializing in writing SEO-friendly program descriptions 
    for the STEM Explorers Club. This club is designed for children aged 8 to 14 who are passionate about STEM. Create a short, persuasive description (1 to 2 sentences, 30 to 40 words) that is 
     engaging, and highlights the program’s value. 

Example: 
for Math Magic & Logic: "Discover the fun side of mathematics! Through games, puzzles, and real-world applications, students will develop strong mathematical thinking skills and see how math connects to everyday life and other STEM fields."
for Engineering Design Challenge : Think like an engineer! Students will tackle real-world design challenges, learning to plan, build, test, and improve their creations. From bridges to towers, this program covers fundamental engineering principles through exciting projects.
for Chemistry Lab Adventures: Explore the magical world of chemistry through safe, hands-on experiments! Students will discover chemical reactions, learn about the periodic table, and conduct exciting experiments that demonstrate scientific principles in action.

Program Details:
- Program Name: ${programDetails.title}
- Age Group: ${programDetails.age_group || "not specified"}
- Duration: ${programDetails.duration || "not specified"}
Description:`;

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
