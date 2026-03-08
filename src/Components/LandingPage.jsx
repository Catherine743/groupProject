import { useNavigate } from "react-router-dom";
import "../App.css";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <div className="hero-section">
        <h1>Stock Management System</h1>

        <p>
          A powerful warehouse management application designed to help
          businesses efficiently manage products, monitor stock levels,
          track sales, and maintain accurate inventory records.
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/products")}
        >
          Get Started →
        </button>
      </div>

      <div className="features-section">

        <div className="feature-card">
          <h3>📦 Product Control</h3>
          <p>Manage all warehouse products with easy add, edit, and delete functionality.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Stock Tracking</h3>
          <p>Monitor stock availability and avoid shortages with real-time updates.</p>
        </div>

        <div className="feature-card">
          <h3>💰 Sales Recording</h3>
          <p>Track product sales and maintain accurate warehouse inventory records.</p>
        </div>

      </div>

    </div>
  );
}

export default LandingPage;