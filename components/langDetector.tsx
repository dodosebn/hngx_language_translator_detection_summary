'use client';
import { useState, useEffect } from 'react';
import { langDetectProps } from '@/types';
const LangDetector = ({ textToBeTranslated }: langDetectProps) => {
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [error, setError] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const detectLanguage = async () => {
    try {
      const response = await fetch('/api/detector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToBeTranslated }),
      });
      if (response.ok) {
        const data = await response.json();
        setDetectedLanguage(data.language);
      } else {
        setError('Language detection failed');
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      setError('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (textToBeTranslated) {
      detectLanguage();
    }
  }, [detectLanguage, textToBeTranslated]);

  return (
    <div>
      {detectedLanguage && <p>Detected Language: {detectedLanguage}</p>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
export default LangDetector;