import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState(""); // Real-world apps track item costs!
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
        if (!name || !quantity || !price) return;
        try {
            await API.post("/products", { 
                name, 
                quantity: Number(quantity), 
                price: Number(price) 
            });
            setName("");
            setQuantity("");
            setPrice("");
            fetchProducts();
        } catch (err) {
            alert("Error saving item");
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to remove this product from global inventory?")) {
            try {
                await API.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert("Could not delete item");
            }
        }
    };

    // 📈 Dynamic Real-Time Enterprise Analytics Calculations
    const totalItems = products.length;
    const totalStock = products.reduce((acc, p) => acc + (p.quantity || 0), 0);
    const lowStockAlerts = products.filter(p => (p.quantity || 0) <= 5).length;
    const estimatedValue = products.reduce((acc, p) => acc + ((p.quantity || 0) * (p.price || 0)), 0);

    return (
        <div className="container-fluid px-4 py-4">
            {/* Header Title Workspace */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold tracking-tight text-dark m-0">Inventory Console</h1>
                    <p className="text-muted small m-0">Manage global stock allocations and item pricing.</p>
                </div>
            </div>

            {/* Analytics Counter Grid */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card p-3 border-0 bg-white shadow-sm">
                        <div className="text-muted small fw-semibold text-uppercase">Unique Products</div>
                        <div className="h2 fw-bold text-primary mt-1">{totalItems}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 border-0 bg-white shadow-sm">
                        <div className="text-muted small fw-semibold text-uppercase">Total Units Cached</div>
                        <div className="h2 fw-bold text-dark mt-1">{totalStock}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 border-0 bg-white shadow-sm">
                        <div className="text-muted small fw-semibold text-uppercase">Asset Valuation</div>
                        <div className="h2 fw-bold text-success mt-1">${estimatedValue.toLocaleString()}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 border-0 bg-white shadow-sm">
                        <div className="text-muted small fw-semibold text-uppercase">Low Stock Alerts</div>
                        <div className={`h2 fw-bold mt-1 ${lowStockAlerts > 0 ? "text-danger" : "text-muted"}`}>
                            {lowStockAlerts} <span className="small fs-6 text-muted"> (≤5 units)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Data Display Layout */}
            <div className="row g-4">
                {/* Product Creation Terminal */}
                <div className="col-xl-4">
                    <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: "90px", zIndex: 10 }}>
                        <h5 className="fw-bold text-dark mb-3">Registry Terminal</h5>
                        <form onSubmit={addProduct}>
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-secondary">Product Name</label>
                                <input className="form-control form-control-lg" value={name} placeholder="e.g., Enterprise Server Switch" required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-medium text-secondary">Stock Qty</label>
                                    <input className="form-control form-control-lg" type="number" value={quantity} placeholder="100" required onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-medium text-secondary">Unit Price ($)</label>
                                    <input className="form-control form-control-lg" type="number" step="0.01" value={price} placeholder="299.99" required onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold fs-6 shadow-sm mt-2">
                                Add to Master Ledger
                            </button>
                        </form>
                    </div>
                </div>

                {/* Master Product Ledger Table */}
                <div className="col-xl-8">
                    <div className="card border-0 shadow-sm p-4">
                        <h5 className="fw-bold text-dark mb-3">Master Ledger</h5>
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary m-3"></div></div>
                        ) : products.length === 0 ? (
                            <div className="text-center text-muted py-5">No products currently registered in database system storage.</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table align-middle table-borderless m-0">
                                    <thead>
                                        <tr className="border-bottom text-muted">
                                            <th className="pb-3">Item Specifications</th>
                                            <th className="text-center pb-3">Unit Cost</th>
                                            <th className="text-center pb-3">Stock Allocation</th>
                                            <th className="text-end pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p) => (
                                            <tr key={p._id} className="border-bottom-subtle">
                                                <td className="py-3 fw-semibold text-dark">{p.name}</td>
                                                <td className="text-center py-3 text-secondary">${(p.price || 0).toFixed(2)}</td>
                                                <td className="text-center py-3">
                                                    <span className={`badge rounded-pill px-3 py-2 fw-medium ${p.quantity > 5 ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                                        {p.quantity} available
                                                    </span>
                                                </td>
                                                <td className="text-end py-3">
                                                    <button className="btn btn-sm btn-light text-danger border-0 px-3 fw-medium" onClick={() => deleteProduct(p._id)}>
                                                        Delete
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