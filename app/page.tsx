import FetchTrans from "@/components/fetchTrans";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <meta
          name="language-detection-token"
          http-equiv="origin-trial" 
          content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTION_TOKEN}
        />
        <meta
          name="translation-token"
          http-equiv="origin-trial" 
          content={process.env.NEXT_PUBLIC_LANG_TRANS_TOKEN}
        />
        <meta
          name="summarize-token"
          http-equiv="origin-trial" 
          content={process.env.NEXT_PUBLIC_SUMMARIZE_TOKEN}
        />
      </Head>
      <div className="bg-[#ffffff] lg:px-[10rem] px-[1.3rem] py-[3rem]">
        <FetchTrans />
      </div>
    </>
  );
}
