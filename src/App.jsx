import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/singleProduct";
import { Register } from "./components/auth/Register";
import { ForgotPassword } from "./components/auth/Forgot";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";

import Faq  from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingReturns from "./pages/ShippingReturns";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/faqs" element={<Faq/>}/>

        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

        <Route path="/terms-conditions" element={<TermsConditions/>}/>

         <Route path="/shipping-returns" element={<ShippingReturns/>}/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;