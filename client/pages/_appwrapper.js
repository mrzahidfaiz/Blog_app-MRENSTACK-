import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import Navbar from "@/components/Navbar";
import useAutoLogin from "@/hooks/useAutoLogin";

export default function App({ Component, pageProps }) {
  const loading = useAutoLogin();
  // loading ? "" : 
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

// export default App;