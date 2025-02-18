'use client';
import { useState } from 'react';
import LangDetector from './langDetector';
import TextTranslator from './textTranslator';
import SummarizeBtn from './summarizeBtn';

const Translator = () => {
  const [textToBeTranslated, setTextToBeTranslated] = useState<string>('');
  const [summarizedText, setSummarizedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextToBeTranslated(event.target.value);
  };

  const handleSummarized = (summary: string) => {
    setSummarizedText(summary);
  };

  const handleTranslated = (translation: string) => {
    setTranslatedText(translation);
  };

  return (
    <div>
      <input
        type="text"
        value={textToBeTranslated}
        onChange={handleTextChange}
        placeholder="Enter text to be translated"
      />
      <LangDetector textToBeTranslated={textToBeTranslated} />
      <SummarizeBtn
        textToBeTranslated={textToBeTranslated}
        onSummarize={handleSummarized}
      />
      <TextTranslator
        textToBeTranslated={summarizedText || textToBeTranslated}
        onTranslated={handleTranslated}
      />
      {translatedText && <p>Final Translation: {translatedText}</p>}
    </div>
  );
};
export default Translator;