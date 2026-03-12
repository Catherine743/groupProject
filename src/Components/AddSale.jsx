import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addSale } from "../redux/slice/stockSlice";

export default function AddSale() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.stockReducer.products);
  const navigate = useNavigate();
  const location = useLocation();

  const passedProductId = location.state?.productId || "";
  const [productId, setProductId] = useState(passedProductId);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = useMemo(
    () => products.find(p => p.id === Number(productId)),
    [productId, products]
  );

  const totalAmount = useMemo(
    () => (quantity && selectedProduct ? Number(quantity) * selectedProduct.price : 0),
    [quantity, selectedProduct]
  );

  const handleSale = () => {
    if (!productId || !quantity) {
      setMessage("Please fill all fields");
      return;
    }

    const qty = Number(quantity);

    if (qty > selectedProduct.stock) {
      setMessage("Not enough stock available");
      return;
    }

    dispatch(
      addSale({
        productId: selectedProduct.id,
        quantity: qty,
      })
    );

    navigate("/products");
  };

  return (
    <div className="card">
      <h3>Record Sale</h3>

      {passedProductId ? (
        <p>Product: <strong>{selectedProduct?.name}</strong></p>
      ) : (
        <select
          value={productId}
          onChange={e => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      )}

      {selectedProduct && (
        <p>
          Category: {selectedProduct.category} <br />
          Available Stock: {selectedProduct.stock} <br />
          Price: ₹{selectedProduct.price}
        </p>
      )}

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      {quantity && <p>Total Amount: ₹{totalAmount}</p>}

      <button onClick={handleSale}>Sell</button>

      {message && <p>{message}</p>}
    </div>
  );
}