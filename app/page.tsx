import FetchTrans from "@/components/fetchTrans";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <meta
          name="language-detection-token"
          content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTION_TOKEN}
        />
        <meta
          name="translation-token"
          content={process.env.NEXT_PUBLIC_LANG_TRANS_TOKEN}
        />
        <meta
          name="summarize-token"
          content={process.env.NEXT_PUBLIC_SUMMARIZE_TOKEN}
        />
      </Head>
      <div>
        <FetchTrans />
      </div>
    </>
  );
}
