import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container-fluid py-2">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    {/* Default fallback route */}
                    <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}