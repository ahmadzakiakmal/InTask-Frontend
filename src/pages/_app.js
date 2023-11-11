import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </main>
  );
}
