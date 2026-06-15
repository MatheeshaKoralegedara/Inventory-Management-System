import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="row justify-content-center mt-5 w-100 m-0">
            <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <h3 className="fw-bold mb-3 text-center text-success">Create Account</h3>
                    {error && <div className="alert alert-danger py-2 small">{error}</div>}
                    
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Full Name</label>
                            <input className="form-control" placeholder="John Doe" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email Address</label>
                            <input className="form-control" type="email" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Password</label>
                            <input className="form-control" type="password" placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-success w-100 py-2 fw-semibold">Sign Up</button>
                    </form>
                    <div className="text-center mt-3 small">
                        Already registered? <Link to="/login" className="text-decoration-none">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}