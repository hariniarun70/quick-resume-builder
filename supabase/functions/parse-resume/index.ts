import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { resumeText } = await req.json();

    if (!resumeText || typeof resumeText !== "string") {
      return new Response(
        JSON.stringify({ error: "resumeText is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Parsing resume text, length:", resumeText.length);

    const systemPrompt = `You are a resume parser. Extract structured data from the given resume text. Return a JSON object with these fields (use empty string or empty array if not found):

{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "linkedin": "string",
  "github": "string",
  "website": "string",
  "objective": "string (career objective or summary)",
  "education": [{"institution": "string", "degree": "string", "field": "string", "startDate": "string", "endDate": "string", "gpa": "string"}],
  "experience": [{"company": "string", "position": "string", "startDate": "string", "endDate": "string", "current": false, "description": "string"}],
  "projects": [{"name": "string", "description": "string", "technologies": "string", "link": "string"}],
  "certifications": [{"name": "string", "issuer": "string", "date": "string", "link": "string"}],
  "technicalSkills": ["string"],
  "softSkills": ["string"],
  "languages": ["string"],
  "hobbies": ["string"],
  "sports": ["string"],
  "courses": ["string"],
  "activities": [{"type": "paper|workshop|hackathon|club|extracurricular|cocurricular", "title": "string", "description": "string", "date": "string"}]
}

IMPORTANT: 
- Return ONLY the JSON object, no markdown formatting, no code blocks.
- Do NOT include profile image or photo information.
- For dates, keep the original format from the resume.
- For skills, separate them into technical and soft skills.
- Be thorough and extract as much information as possible.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Parse this resume:\n\n${resumeText}` },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received, parsing JSON...");

    // Clean up the response - remove markdown code blocks if present
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.slice(7);
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(0, -3);
    }
    cleanContent = cleanContent.trim();

    const parsedData = JSON.parse(cleanContent);

    console.log("Resume parsed successfully");

    return new Response(JSON.stringify({ data: parsedData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Parse resume error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to parse resume" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
