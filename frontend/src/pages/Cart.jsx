import React, { useEffect, useState } from "react";
import "../styles/Cart.css";

export default function Cart() {
  // State giỏ hàng (có thể thay bằng Redux hoặc Context sau này)
  const [cartItems, setCartItems] = useState([]);

  // Lấy dữ liệu giỏ hàng từ localStorage (nếu có)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Hàm xóa sản phẩm khỏi giỏ
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-page">
      <h1>Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="80" />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Giá: {item.price}₫</p>
                <p>Số lượng: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
