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
import { Account } from "./pages/Account/Account";
import { Profile } from "./pages/Account/component/Profile";
import { Address } from "./pages/Account/component/Address";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";

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
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/success"
          element={
            <RequireAuth>
              <PaymentSuccessPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        ></Route>
        <Route path="/account/profile" element={<Profile />}></Route>
        <Route path="/account/address" element={<Address />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
