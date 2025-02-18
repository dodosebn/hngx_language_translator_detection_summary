import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const encodedToken =
    'Aoeg49e8gXziww8aMaciOT3ocfAg14TCdd6srBr0/ENCVaog72otR4Or4Qjz9qByZNGl2mbK/pxvft9j0jf8sw0AAABReyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9';

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

    // Perform translation (dummy translation example)
    const translatedText = 'Texte traduit'; // Replace with actual translation logic

    return NextResponse.json({ success: true, translatedText });
  } catch (error) {
    console.error('Error translating text:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}