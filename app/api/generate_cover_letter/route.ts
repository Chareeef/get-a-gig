import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Groq client with the API key from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  // Extract job title and description and user name and bio from the request body
  const { jobTitle, jobDescription, userName, userBio } = await req.json();

  // Check for missing job title, description, and user name and bio
  if (!jobTitle || !jobDescription || !userName || !userBio) {
    return new NextResponse(
      JSON.stringify({
        error: "Job title, job description or user bio not provided",
      }),
      { status: 400 },
    );
  }

  // Create the system prompt with the cover letter schema
  const systemPrompt =
    "You are an expert cover letter generator tasked with creating highly professional, compelling cover letters based on the provided job title, job description and user bio. Your cover letters always include a strong opening hook that captures attention, a well-structured body that highlights relevant skills and experiences, and a persuasive conclusion. The tone is tailored to match the job description, ensuring it is formal, respectful, and aligned with industry standards. You provide only the cover letter text, with no markup, formatting, or extraneous content—just a clean, polished cover letter ready for use.";

  try {
    // Use Groq API to generate a cover letter based on the job description and user bio
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt, // Schema and instructions for generating the cover letter
        },
        {
          role: "user",
          content: `Generate a cover letter for the following job:\nTitle: ${jobTitle}\n\nDescription:\n\n${jobDescription}\n\nAnd the following bio of the user ${userName}:\n${userBio}`, // User input for job and bio
        },
      ],
      model: "llama-3.1-70b-versatile", // Model used for generating the content
      temperature: 0.7, // Slightly higher temperature for more variation
      stream: true, // Enable streaming
    });

    // Create a readable stream to stream the response back
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
        try {
          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(content));
          }
        } catch (error) {
          controller.error(error); // Handle any errors that occur during streaming
        } finally {
          controller.close(); // Close the stream when done
        }
      },
    });

    // Return the stream as a response
    return new NextResponse(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return new NextResponse(JSON.stringify({ error: error?.toString() }), {
      status: 500,
    });
  }
}
