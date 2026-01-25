import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/cart";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;