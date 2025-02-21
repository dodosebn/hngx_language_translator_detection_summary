import React from "react";

interface DisplayUpInputaProps {
  txtToBeTranslated: string;
  detectedLangMessage: string;
  showSummarize: boolean;
  handleSummarize: () => void;
  summarizedTxt: string;
  handleTranslate: (value: string) => void;
  translatedTxt: string;
}

const DisplayUpInputa: React.FC<DisplayUpInputaProps> = ({
  txtToBeTranslated,
  detectedLangMessage,
  showSummarize,
  handleSummarize,
  summarizedTxt,
  handleTranslate,
  translatedTxt,
}) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <section className="flex-1 p-4">
        <span className="font-semibold">Your written text</span>
        <div className="p-2 border border-gray-300 rounded bg-white">
          {txtToBeTranslated}
        </div>

        {txtToBeTranslated && (
          <div className="space-y-4 mt-4">
            <p className="text-sm text-gray-500">
              Detected Language: {detectedLangMessage}
            </p>

            {showSummarize && (
              <button
                onClick={handleSummarize}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Summarize
              </button>
            )}

            {summarizedTxt && (
              <div className="p-4 bg-gray-100 rounded">
                <p className="italic">{summarizedTxt}</p>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="flex-1 p-4">
        <select
          onChange={(e) => handleTranslate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Translate to Language</option>
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
          <option value="fr">French</option>
        </select>

        {translatedTxt && (
          <div className="p-4 bg-gray-100 rounded mt-4">
            <p>{translatedTxt}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DisplayUpInputa;
