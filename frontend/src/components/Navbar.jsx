import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
            <Link className="navbar-brand fw-bold text-gradient" to="/products">📦 StockOps</Link>
            
            <div className="ms-auto d-flex align-items-center">
                {token ? (
                    <>
                        <Link className={`nav-link me-3 ${location.pathname === "/products" ? "text-white fw-bold" : "text-white-50"}`} to="/products">Inventory</Link>
                        <button className="btn btn-sm btn-outline-danger px-3" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className={`nav-link me-3 ${location.pathname === "/login" ? "text-white fw-bold" : "text-white-50"}`} to="/login">Login</Link>
                        <Link className={`nav-link ${location.pathname === "/register" ? "text-white fw-bold" : "text-white-50"}`} to="/register">Register</Link>
                    </>
                )
                }
            </div>
        </nav>
    );
}