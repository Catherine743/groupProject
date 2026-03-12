import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { clearProducts, deleteProduct } from "../redux/slice/stockSlice";

function ViewProducts() {
  const { products, threshold } = useSelector(state => state.stockReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filter.toLowerCase());
      const categoryMatch = categoryFilter ? product.category === categoryFilter : true;
      return nameMatch && categoryMatch;
    });
  }, [products, filter, categoryFilter]);

  const handleClearAll = () => {
    if (window.confirm("Delete all products?")) {
      dispatch(clearProducts());
    }
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      <input
        placeholder="Search product..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={e => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleClearAll}>
          Clear All Products
        </button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sold</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>
                {product.stock}
                {product.stock <= threshold && <span className="low-stock"> (Low Stock!)</span>}
              </td>
              <td>{product.sold}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => navigate("/addsale", { state: { productId: product.id } })}>
                    Sell
                  </button>
                  <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
                  <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;