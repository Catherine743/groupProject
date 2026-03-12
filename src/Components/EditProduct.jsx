import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice/stockSlice";
import { useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector(state =>
    state.stockReducer.products.find(item => item.id === Number(id))
  );

  const products = useSelector(state => state.stockReducer.products);
  const categories = [...new Set(products.map(p => p.category))];

  if (!product) return <p>Product not found</p>;

  const [form, setForm] = useState({
    price: product.price,
    stock: product.stock,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price: Number(form.price),
      stock: Number(form.stock),
    }));

    navigate("/products");
  };

  return (
    <div className="card">
      <h2>Edit Product</h2>

      <label>Product Name</label>
      <input
        name="name"
        value={product.name}
        readOnly
        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
      />

      <label>Category</label>
      <input
        name="category"
        value={product.category}
        readOnly
        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
      />

      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
}

export default EditProduct;