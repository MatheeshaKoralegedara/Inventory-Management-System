import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error pulling product list", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        if (!name || !quantity) return;
        try {
            await API.post("/products", { name, quantity: Number(quantity) });
            setName("");
            setQuantity("");
            fetchProducts();
        } catch (err) {
            alert("Error adding item");
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to remove this product?")) {
            try {
                await API.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert("Could not delete item");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {/* Left Column: Input Form */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-3 text-secondary">Add New Product</h4>
                        <form onSubmit={addProduct}>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Item Name</label>
                                <input className="form-control" value={name} placeholder="e.g., Wireless Router" required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Stock Quantity</label>
                                <input className="form-control" type="number" value={quantity} placeholder="e.g., 50" required onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 fw-semibold">Save to Inventory</button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Inventory Data Sheet */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold m-0 text-secondary">Stock Inventory</h4>
                            <span className="badge bg-primary rounded-pill px-3 py-2">{products.length} Items Total</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
                        ) : products.length === 0 ? (
                            <div className="text-center text-muted py-4">No products tracked yet. Use the left pane to add stock.</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Product Identity</th>
                                            <th className="text-center">Available Stock</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p) => (
                                            <tr key={p._id}>
                                                <td className="fw-semibold text-dark">{p.name}</td>
                                                <td className="text-center">
                                                    <span className={`badge px-2 py-1 ${p.quantity > 10 ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                                        {p.quantity} units
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    <button className="btn btn-outline-danger btn-sm border-0" onClick={() => deleteProduct(p._id)}>
                                                        🗑️ Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}