"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import type { LanguageDetectorCapabilities, DetectedLanguageResult, SummarizerOptions } from "@/types";
import Inputa from "./inputa";
import DisplayUpInputa from "./displayUpInputa";

const FetchTrans: React.FC = () => {
  const [txtToBeTranslated, setTxtToBeTranslated] = useState<string>("");
  const [translatedTxt, setTranslatedTxt] = useState<string>("");
  const [showSummarize, setShowSummarize] = useState<boolean>(false);
  const [summarizedTxt, setSummarizedTxt] = useState<string>("");
  const [detectedLangMessage, setDetectedLangMessage] = useState<string>("");
  const [detectedLangCode, setDetectedLangCode] = useState<string>("");

  const detectLanguageAPI = useCallback(async () => {
    if (!txtToBeTranslated.trim()) {
      setDetectedLangMessage("Text is empty");
      setDetectedLangCode("");
      setTranslatedTxt("");
      setSummarizedTxt("");
      return;
    }

    try {
      if ("ai" in self && "languageDetector" in (self.ai as any)) {
        const languageDetectorCapabilities: LanguageDetectorCapabilities =
          await (self.ai as any).languageDetector.capabilities();
        const canDetect = languageDetectorCapabilities.available;
        let detector;

        if (canDetect === "no") {
          setDetectedLangMessage("Language Detector is not usable.");
          return;
        }

        if (canDetect === "readily") {
          detector = await (self.ai as any).languageDetector.create();
        } else {
          detector = await (self.ai as any).languageDetector.create({
            monitor(m: any) {
              m.addEventListener("downloadprogress", (e: ProgressEvent) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          await detector.ready;
        }

        const results: DetectedLanguageResult[] = await detector.detect(
          txtToBeTranslated
        );
        if (results?.[0]) {
          const topResult = results[0];
          setDetectedLangMessage(
            `${(topResult.confidence * 100).toFixed(1)}% sure this is ${
              topResult.detectedLanguage
            }`
          );
          setDetectedLangCode(topResult.detectedLanguage);
        } else {
          setDetectedLangMessage("Could not detect language");
          setDetectedLangCode("");
        }
      } else {
        setDetectedLangMessage("Language Detector API is not supported.");
      }
    } catch (error) {
      setDetectedLangMessage("Error detecting language");
      console.error("Error:", error);
    }
  }, [txtToBeTranslated]);

  const handleSummarize = async () => {
    try {
      if (!detectedLangCode) return;

      if ("ai" in self && "summarizer" in (self.ai as any)) {
        const options: SummarizerOptions = {
          sharedContext: "This is a scientific article",
          type: "key-points",
          format: "markdown",
          length: "medium",
        };

        const available: "no" | "readily" | "conditionally" = (
          await (self.ai as any).summarizer.capabilities()
        ).available;
        let summarizer;

        if (available === "no") {
          setSummarizedTxt("Summarizer API is not usable.");
          return;
        }

        // eslint-disable-next-line prefer-const
        summarizer = await (self.ai as any).summarizer.create(options);

        if (available === "conditionally") {
          summarizer.addEventListener(
            "downloadprogress",
            (e: ProgressEvent) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            }
          );
          await summarizer.ready;
        }

        const summary: string = await summarizer.summarize(txtToBeTranslated);
        setSummarizedTxt(summary || "Error summarizing text");
      } else {
        setSummarizedTxt("Summarizer API is not supported.");
      }
    } catch (err) {
      setSummarizedTxt("Error summarizing text");
      console.error("Error:", err);
    }
  };

  const handleTranslate = async (targetLanguage: string) => {
    if (!detectedLangCode) {
      setTranslatedTxt("Please detect language first");
      return;
    }

    try {
      if ("ai" in self && "translator" in (self.ai as any)) {
        const translator = await (self.ai as any).translator.create({
          sourceLanguage: detectedLangCode,
          targetLanguage: targetLanguage,
          monitor(m: any) {
            m.addEventListener("downloadprogress", (e: ProgressEvent) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await translator.ready;

        const translation: string = await translator.translate(
          txtToBeTranslated
        );
        setTranslatedTxt(translation || "Error in translation");
      } else {
        setTranslatedTxt("Translator API is not supported.");
      }
    } catch (error) {
      setTranslatedTxt("Error translating text");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (txtToBeTranslated) {
        detectLanguageAPI();
      } else {
        setDetectedLangMessage("");
        setDetectedLangCode("");
        setTranslatedTxt("");
        setSummarizedTxt("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [txtToBeTranslated, detectLanguageAPI]);

  useEffect(() => {
    setShowSummarize(
      txtToBeTranslated.length > 150 && detectedLangCode === "en"
    );
  }, [txtToBeTranslated, detectedLangCode]);

  return (
    <div className="p-4">
      <main>
      <DisplayUpInputa txtToBeTranslated={txtToBeTranslated} detectedLangMessage={detectedLangMessage} showSummarize={showSummarize} handleSummarize={handleSummarize} summarizedTxt={summarizedTxt} handleTranslate={handleTranslate} translatedTxt={translatedTxt}/>
      </main>
      <div>
   <Inputa txtToBeTranslated={txtToBeTranslated} setTxtToBeTranslated={setTxtToBeTranslated} detectLanguageAPI={detectLanguageAPI}/>
   </div>
    </div>
  );
};

export default FetchTrans;
