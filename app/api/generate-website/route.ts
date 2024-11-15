import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiResponse {
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = new URLSearchParams(await request.text());
    const elementChoice = formData.get('elementChoice');
    const styleChoice = formData.get('styleChoice');
    const description = formData.get('description');

    if (!elementChoice || !styleChoice || !description) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);  // Ensure your API_KEY is set in .env
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare the prompt to send to Gemini (adjust based on your use case)
    const prompt = `Generate a website structure for a ${description} website using ${elementChoice} and styled with ${styleChoice}. Please return everything in just one file. Just give the code, and don't say anything else.`;

    // Generate content using Gemini model
    const result = await model.generateContent(prompt);

    // Extract the generated HTML or website content (depending on API)
    const generatedHtml = result.response.text();  // Adjust if necessary

    // Return the generated content
    return NextResponse.json({
      message: 'Website generated successfully',
      html: generatedHtml,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to generate website', error: error.message },
      { status: 500 }
    );
  }
}
