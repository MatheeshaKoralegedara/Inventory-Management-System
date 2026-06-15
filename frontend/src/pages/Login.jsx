import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/products"); // Smooth programmatic redirect
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="row justify-content-center mt-5 w-100 m-0">
            <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <h3 className="fw-bold mb-3 text-center text-primary">Sign In</h3>
                    {error && <div className="alert alert-danger py-2 small">{error}</div>}
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email Address</label>
                            <input className="form-control" type="email" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Password</label>
                            <input className="form-control" type="password" placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary w-100 py-2 fw-semibold">Login</button>
                    </form>
                    <div className="text-center mt-3 small">
                        Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}