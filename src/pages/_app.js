import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AuthProvider } from "@/components/AuthProvider";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <main>
      <AuthProvider>
        <ToastContainer position="bottom-right" />
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
}
