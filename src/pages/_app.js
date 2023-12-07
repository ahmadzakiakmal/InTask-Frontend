import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AuthProvider } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import Head from "next/head";
config.autoAddCss = false;
import Aos from "aos";
import "aos/dist/aos.css";

function Loading({ open }) {
  if(open) return(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-[8px] flex justify-center items-center z-[9999]">
      <span className="text-[40px] text-neutral animate-pulse">Loading...</span>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  });
  return (
    <>
      <Head>
        <title>InTask - Project Management Web</title>
        <meta name="description" content="InTask - Project management web application to help manage your projects and assignments while collaborating with others" />
        <link rel="icon" href="/InTaskLogo.png" />
      </Head>
      <main>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Loading open={loading} />
          <AuthProvider>
            <ToastContainer position="bottom-right" />
            <Component {...pageProps} />
          </AuthProvider>
        </LoadingContext.Provider>
      </main></>
  );
}
