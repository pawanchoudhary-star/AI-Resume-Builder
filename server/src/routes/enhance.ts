import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { summary, expDescription } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        summary: summary ? summary + " (Enhanced by AI: Demonstrated strong leadership and problem-solving skills.)" : "A highly motivated professional with excellent problem-solving skills, enhanced by AI.",
        expDescription: expDescription ? expDescription + " (AI Optimized: Increased efficiency by 40%.)" : "AI Optimized: Spearheaded key initiatives that resulted in a 40% increase in operational efficiency.",
        error: "GEMINI_API_KEY is not set. Using fallback data."
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are an expert resume writer. Please enhance the following resume sections to be more professional, impactful, and ATS-friendly. 
    Keep the enhanced text concise and punchy.
    
    Original Summary:
    ${summary || "N/A"}

    Original Experience Description:
    ${expDescription || "N/A"}
    
    Return the result strictly in this JSON format without markdown blocks:
    {
      "summary": "enhanced summary here",
      "expDescription": "enhanced experience description here formatted with bullet points like ? Point 1\\n? Point 2"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let text = response.text || "{}";
    text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    const result = JSON.parse(text);

    return res.json({
      summary: result.summary || summary,
      expDescription: result.expDescription || expDescription
    });

  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return res.status(500).json({ error: "Failed to enhance resume" });
  }
});

export default router;
