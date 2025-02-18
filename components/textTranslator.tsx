'use client';
import { useState, FormEvent } from 'react';

const TextTranslator = ({ textToBeTranslated, onTranslated }: { textToBeTranslated: string; onTranslated: (translation: string) => void }) => {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleTranslate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToBeTranslated }),
      });
      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translatedText);
        onTranslated(data.translatedText);
      } else {
        setError('Translation failed');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleTranslate}>
        <button type="submit" disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>
      {translatedText && <p>Translated Text: {translatedText}</p>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
export default TextTranslator;