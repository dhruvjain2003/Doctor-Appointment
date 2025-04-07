import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json();
  const api = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const context = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: context }] }],
        }),
      }
    );

    const data = await response.json();
    console.log('Raw Gemini response:', JSON.stringify(data, null, 2));

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';
    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error('Gemini fetch error:', error.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
