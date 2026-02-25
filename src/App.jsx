import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/usercontext";
import { CartProvider } from "./context/CartContext";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Cart from "./pages/cart";
import ProviderDashboard from "./pages/ProviderDashboard";

import Sales from "./pages/Sales";
import AboutUs from "./pages/AboutUs";
import Footer from "./Components/Footer";
import ServiceRequest from "./pages/ServiceRequest";

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <div style={{ paddingTop: "50px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/service-request" element={<ServiceRequest />} />
          </Routes>
        </div>
      </CartProvider>
      <Footer />
    </UserContextProvider>
  );
}

export default App;