import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-workspace)" }}>
                <Navbar />
                <Routes>
                    {/* Public Guest Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Secure Protected Enterprise Routes */}
                    <Route path="/products" element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    } />
                    
                    {/* Fallback Entry Routing */}
                    <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}