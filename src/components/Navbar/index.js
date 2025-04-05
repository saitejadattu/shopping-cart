import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Navbar = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { cart, updateRemoveQuantity, updateAddQuantity } = props;
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);
  const handleAddQuantity = (item) => {
    updateAddQuantity(item);
  };
  const handleRemoveQuantity = (item) => {
    updateRemoveQuantity(item);
  };
  const totalPrice = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const progress = Math.min((totalPrice / 1000) * 100, 100);
  const translateX = 100 - progress;
  return (
    <div>
      <nav>
        <ul className="list-none flex justify-between items-center bg-purple-50 p-4 shadow-md">
          <li>
            <Link to="/">Store</Link>
          </li>
          <li
            onClick={() => setIsOpen(!isOpen)}
            className="relative cursor-pointer"
          >
            <FaShoppingCart className="h-10 w-20 text-red-500" />
            <span className="absolute right-0 top-2 h-15 w-10 rounded-full bg-white border-4 border-red-500 text-center text-red-500 text-2xl font-bold">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative min-h-[20vh] max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white absolute right-2 top-2 px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
            <div>
              <ul className="mt-5 ">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b py-2 "
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-15 mr-5 ml-5 object-cover"
                      />
                      <ul className="flex-1">
                        <li>{item.title}</li>
                        <li>
                          <span className="text-1xl font-bold">₹</span>
                          {Math.round(item.price * item.quantity)}
                        </li>
                      </ul>
                      <div className="flex-1">
                        <button
                          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition m-1"
                          onClick={() => handleRemoveQuantity(item)}
                        >
                          -
                        </button>
                        <span className="text-red-500 font-bold text-lg">
                          {item.quantity ? item.quantity : 0}
                        </span>
                        <button
                          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition m-1"
                          onClick={() => handleAddQuantity(item)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center">No items in cart</li>
                )}
              </ul>
              {totalPrice >= 1000 && (
                <li className="flex justify-between flex-1">
                  <img
                    alt="free product"
                    src="https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
                    className="w-10 h-15 mr-5 ml-5 object-cover"
                  />
                  <span className="mr-20 self-center">free</span>
                </li>
              )}
              {totalPrice > 0 && (
                <p className="text-end">
                  Total Cart Value: {Math.round(totalPrice)}
                </p>
              )}
              {totalPrice <= 1000 && (
                <p>
                  add items worth {Math.round(1000 - totalPrice)} to get free
                  item
                </p>
              )}
              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden relative">
                <div
                  className="bg-green-500 h-full transition-transform duration-500"
                  style={{
                    transform: `translateX(-${translateX}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
