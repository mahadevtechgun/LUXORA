import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ui/ScrollToTop";
import CouponPopup from "./components/ui/CouponPopup";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <ScrollToTop/>
          <CouponPopup/>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
            newestOnTop={true}
            pauseOnHover={false}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);