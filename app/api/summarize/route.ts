import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const encodedToken =
    'ApywZEcawPu3bp6OLLTdoGZKtPjN5sKcNOYQ7FrAJbcOp/vfx7SNIZu8Zxj9gqcIPXzkGd5/KiS1HpvUvKee5gwAAABVeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==';

  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ success: false, error: 'No text provided' }, { status: 400 });
    }

    // Decode and validate the token
    const decodedString = Buffer.from(encodedToken, 'base64').toString('utf-8');
    const tokenData = JSON.parse(decodedString);

    if (tokenData.origin !== 'http://localhost:3000') {
      return NextResponse.json({ success: false, error: 'Invalid origin' }, { status: 403 });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (tokenData.expiry && currentTime > tokenData.expiry) {
      return NextResponse.json({ success: false, error: 'Token has expired' }, { status: 403 });
    }

    // Perform summarization (dummy summarization example)
    const summary = text.slice(0, 150) + '...'; // Replace with actual summarization logic

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}