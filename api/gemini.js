export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    const prompt = `
Generate 3 thoughtful, specific interview questions for a ${jobTitle} role.
Return ONLY a numbered list of 3 questions.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Gemini API failed");
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({ text });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to generate questions",
    });
  }
}