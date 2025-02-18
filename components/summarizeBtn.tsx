'use client';
import { useState } from 'react';

export default function SummarizeBtn({ textToBeTranslated, onSummarize }: { textToBeTranslated: string; onSummarize: (summary: string) => void }) {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToBeTranslated }),
      });
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
        onSummarize(data.summary);
      } else {
        setError('Summarization failed');
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {textToBeTranslated.length > 150 && (
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      )}
      {summary && <p>Summary: {summary}</p>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}