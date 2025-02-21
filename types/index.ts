export type LanguageDetectorCapabilities = {
    available: 'no' | 'readily' | 'conditionally';
  };
  
  export type DetectedLanguageResult = {
    confidence: number;
    detectedLanguage: string;
  };
  
  export type SummarizerOptions = {
    sharedContext: string;
    type: string;
    format: string;
    length: string;
  };
  