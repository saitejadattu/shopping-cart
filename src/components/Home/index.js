import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }
  const handleAddQuantity = (product) => {
    const updatedProduct = {
      ...product,
      quantity: (product.quantity || 0) + 1,
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === updatedProduct.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === updatedProduct.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveQuantity = (product) => {
    const updatedProduct = { ...product }; // Clone to avoid mutation
    updatedProduct["quantity"] = updatedProduct["quantity"]
      ? updatedProduct["quantity"] - 1
      : 0;
    if (updatedProduct["quantity"] < 0) updatedProduct["quantity"] = 0;

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === updatedProduct.id);
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((p) =>
          p.id === updatedProduct.id ? { ...p, quantity: p.quantity - 1 } : p
        );
      } else {
        return prevCart.filter((p) => p.id !== updatedProduct.id);
      }
    });
  };

  return (
    <div>
      <Navbar
        cart={cart}
        updateRemoveQuantity={handleRemoveQuantity}
        updateAddQuantity={handleAddQuantity}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-purple-50 shadow-lg rounded-sm p-4 flex flex-col items-center hover:shadow-xl transition duration-300"
          >
            <img
              onClick={() => navigate(`/product/${product.id}`)}
              src={product.image}
              alt={product.title}
              className="w-40 h-40 object-contain mb-3 cursor-pointer"
            />
            <h2 className="text-lg font-semibold truncate w-40">
              {product.title}
            </h2>
            <p className="text-gray-600 mt-1">Price: {product.price}</p>
            <div>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition m-1"
                onClick={() => handleRemoveQuantity(product)}
              >
                -
              </button>
              <span className="mt-3 px-4 py-2 w-20 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition m-1">
                {product.quantity ? product.quantity : 0}
              </span>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition m-1"
                onClick={() => handleAddQuantity(product)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
