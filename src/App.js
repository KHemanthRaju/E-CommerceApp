import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  ProductPage,
  WishlistPage,
  CartPage,
  LoginPage,
  SignupPage,
  CheckoutPage,
  PaymentSuccessPage,
} from "./pages/index";
import { Navbar } from "./components/index";
import { useAuth } from "./contexts/AuthContext";
import { RequireAuth } from "./hooks/RequireAuth";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { user } = useAuth();
  return (
    <div className="main-container2">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishlistPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        {/* <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        /> */}
        <Route
          path="/success"
          element={
            <RequireAuth>
              <PaymentSuccessPage />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
