import { IoSendSharp } from "react-icons/io5";

interface InputaProps {
    txtToBeTranslated: string;
    setTxtToBeTranslated: (value: string) => void;
    detectLanguageAPI: () => void;
}

const Inputa: React.FC<InputaProps> = ({ txtToBeTranslated, setTxtToBeTranslated, detectLanguageAPI }) => {
    return (
        <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)' }} className="mb-4 relative bg-[#ffffff] rounded-xl">
            <textarea
                className="w-full p-3 border-none outline-none rounded pr-10 text-[#000]"
                value={txtToBeTranslated}
                onChange={(e) => setTxtToBeTranslated(e.target.value)}
                placeholder="Type or paste your text here..."
            />
            <button
                onClick={detectLanguageAPI}
                className="absolute right-3 top-3 text-black hover:text-black"
            >
                <IoSendSharp size={34}/>
            </button>
        </div>
    );
}

export default Inputa;
