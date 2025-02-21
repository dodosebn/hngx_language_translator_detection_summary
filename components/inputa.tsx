import { IoSendSharp } from "react-icons/io5";

interface InputaProps {
  txtToBeTranslated: string;
  setTxtToBeTranslated: (value: string) => void;
  handlePostText: (text: string) => void; 
}

const Inputa: React.FC<InputaProps> = ({ txtToBeTranslated, setTxtToBeTranslated, handlePostText }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostText(txtToBeTranslated);
      setTxtToBeTranslated(""); 
    }
  };

  const handleClick = () => {
    handlePostText(txtToBeTranslated);
    setTxtToBeTranslated(""); 
  };

  return (
    <div className="mb-4 relative bg-white rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.1),4px_0_8px_rgba(0,0,0,0.1),-4px_0_8px_rgba(0,0,0,0.1)]">
      <textarea
        className="w-full p-3 border-none outline-none rounded-xl pr-12 text-black placeholder-gray-500 resize-none"
        value={txtToBeTranslated}
        onChange={(e) => setTxtToBeTranslated(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type or paste your text here..."
        aria-label="Text input for translation"
      />
      <button
        onClick={handleClick}
        disabled={!txtToBeTranslated.trim()}
        className="absolute right-3 top-3 text-black hover:text-gray-700 transition-colors duration-200"
        aria-label="Submit text for translation"
      >
        <IoSendSharp size={24} />
      </button>
    </div>
  );
};

export default Inputa;
