import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return Response.json({ exists: false, reason: "No title" }, { status: 200 });
    }

    // 1. Get all existing blog titles
    const blogs = await prisma.blog.findMany({
      select: {
        title: true
      }
    });

    if (blogs.length === 0) {
      return Response.json({ exists: false });
    }

    // 2. Build comparison prompt
    const existingTitles = blogs.map(b => b.title);

    const prompt = `
You are a semantic deduplication engine.

Compare the NEW title:
"${title}"

Against the following existing titles:
${existingTitles.map(t => `- "${t}"`).join("\n")}

Goal:
Detect if the NEW title refers to the SAME NEWS as any of the existing ones.

Return ONLY this JSON:
{
  "isDuplicate": true | false,
  "bestMatchTitle": "the matched title or null",
  "similarity": 0-100
}

Rule:
- Treat similarity above 82% as duplicate.
- Use meaning-based comparison, not word matching.
    `;

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.0
    });

    const result = JSON.parse(ai.choices[0].message.content);

    return Response.json({
      exists: result.isDuplicate,
      similarity: result.similarity,
      bestMatch: result.bestMatchTitle
    });

  } catch (err) {
    console.error(err);
    return Response.json({ exists: false, error: err.message });
  }
}
