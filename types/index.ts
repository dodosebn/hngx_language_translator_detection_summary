export interface langDetectProps {
    textToBeTranslated: string;
  }
  
  export interface summarizeBtnProps {
    textToBeTranslated: string;
    onSummarize: (summary: string) => void;
  }
  
  export interface textTranslatorProps {
    textToBeTranslated: string;
    onTranslated: (translation: string) => void;
  }
  
  export interface languagesProps {
    languages: string[];
  }