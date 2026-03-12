import { createSlice } from "@reduxjs/toolkit";

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

const persist = (products, sales) => {
  localStorage.setItem("products", JSON.stringify(products));
  if (sales) localStorage.setItem("sales", JSON.stringify(sales));
};

const stockSlice = createSlice({
  name: "stock",

  initialState : {
  products: storedProducts,
  sales: storedSales,
  threshold: 5,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      persist(state.products);
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index === -1) return;

      state.products[index] = { ...state.products[index], ...action.payload };
      persist(state.products);
    },

    addSale: (state, action) => {
      const { productId, quantity } = action.payload;

      const product = state.products.find(p => p.id === productId);
      if (!product || product.stock < quantity) return;

      product.stock -= quantity;
      product.sold += quantity;

      const totalAmount = quantity * product.price;

      state.sales.push({
        id: Date.now(),
        productId,
        quantity,
        totalAmount,
        date: new Date().toISOString(),
      });

      persist(state.products, state.sales);
    },

    deleteProduct: (state, action) => {
      const id = action.payload;

      state.products = state.products.filter(p => p.id !== id);
      state.sales = state.sales.filter(s => s.productId !== id);

      persist(state.products, state.sales);
    },

    clearProducts: (state) => {
      state.products = [];
      state.sales = [];

      localStorage.removeItem("products");
      localStorage.removeItem("sales");
    },
  },
});

export const {
  addProduct,
  updateProduct,
  addSale,
  deleteProduct,
  clearProducts,
} = stockSlice.actions;

export default stockSlice.reducer;