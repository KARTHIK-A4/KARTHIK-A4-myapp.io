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
import AdminDashboard from "./pages/admin/AdminDashboard";
import Cart from "./pages/cart";

import Sales from "./pages/sales/Sales";

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;