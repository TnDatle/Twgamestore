import React, { useState, useEffect } from "react";
import "../styles/OldConsole.css";

import ps5 from "../images/ps5.png";
import ps4 from "../images/ps4.png";
import nintendo from "../images/nintendo.webp";
import xbox from "../images/xbox.webp";
import handheld from "../images/handheld.webp";
import metaquest from "../images/metaquest.webp";
import retro from "../images/retro.webp";

const consoles = [
  { id: 1, name: "PS5", image: ps5 },
  { id: 2, name: "PS4", image: ps4 },
  { id: 3, name: "Nintendo", image: nintendo },
  { id: 4, name: "Xbox", image: xbox },
  { id: 5, name: "Handheld PC", image: handheld },
  { id: 6, name: "Meta Quest", image: metaquest },
  { id: 7, name: "Retro", image: retro },
];

export default function OldConsole() {
  const [selectedConsole, setSelectedConsole] = useState("PS4"); // mặc định hiển thị PS4
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gọi API khi chọn console
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/oldconsole/${selectedConsole}`);
        const data = await res.json();
        setProducts(data || []); // tránh null
      } catch (err) {
        console.error("❌ Lỗi khi fetch:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedConsole]);

  // Hàm format giá
  const formatPrice = (price) => {
    if (!price) return "Liên hệ";
    return Number(price).toLocaleString("vi-VN") + "₫";
  };

  return (
    <div className="console-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Trang chủ</span> <span>/</span>
        <span>Sản phẩm</span> <span>/</span>
        <span className="current">Máy Game Cũ</span>
      </div>

      <h1>Máy Game Cũ</h1>

      {/* Danh sách console */}
      <div className="console-list">
        {consoles.map((item) => (
          <div
            key={item.id}
            className={`console-card ${selectedConsole === item.name ? "active" : ""}`}
            onClick={() => setSelectedConsole(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        <h2>Sản phẩm {selectedConsole}</h2>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          <div className="products">
            {products
                .filter((p) => p && p.Name && p.Images) 
                .map((p) => (
                <div key={p.id} className="product-card">
                    <img src={p.Images} alt={p.Name} />
                    <h3>{p.Name}</h3>
                    <p>{formatPrice(p.Price)}</p>
                    <button>Thêm vào giỏ</button>
                </div>
                ))}
            </div>
        ) : (
          <p>Không có sản phẩm</p>
        )}
      </div>
    </div>
  );
}
