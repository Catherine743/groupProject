import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slice/stockSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function InputField({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const products = useSelector(state => state.stockReducer.products);
  const categories = [...new Set(products.map(p => p.category))];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const prc = Number(price);
    const stk = Number(stock);

    if (!trimmedName || !price || !stock || !category) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        name: trimmedName,
        category,
        price: prc,
        stock: stk,
        sold: 0,
      })
    );

    navigate("/products");
  };

  return (
    <div className="card">
      <h3>Add Product</h3>

      <InputField
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        list="category-list"
        placeholder="Select or type category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <datalist id="category-list">
        {categories.map((cat, index) => (
          <option key={index} value={cat} />
        ))}
      </datalist>

      <InputField
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <InputField
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}