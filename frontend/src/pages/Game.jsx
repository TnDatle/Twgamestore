import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { fetchData } from "../utils/request";

const categories = [
  { label: "Game PS5", value: "PS5" },
  { label: "Game PS4", value: "PS4" },
  { label: "Game Switch", value: "Switch" },
  { label: "Game Nintendo", value: "Nintendo" },
  { label: "Game Collection", value: "Collection" },
  { label: "Game Digital", value: "Digital" },
  { label: "Game Secondhand", value: "Secondhand" },
];

export default function Game() {
  const [activeCategory, setActiveCategory] = useState("PS4");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGames = async (platform) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchData(`/games/${platform}`);
      setGames(Array.isArray(data) ? data : []);
    } catch {
      setError("Không thể tải dữ liệu game. Vui lòng thử lại sau.");
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(activeCategory);
  }, [activeCategory]);

  return (
    <div className="game-page">
      <div className="breadcrumb">
        <span>Trang chủ</span> <span>/</span>
        <span>Sản phẩm</span> <span>/</span>
        <span className="current">Game</span>
      </div>

      <div className="filter-row">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn ${activeCategory === cat.value ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>⏳ Đang tải game...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : games.length === 0 ? (
        <p>Không có game nào.</p>
      ) : (
        <div className="game-grid">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.Image} alt={game.Name} />
              <h3>{game.Name}</h3>
              <span className="platform">{game.series}</span>
              <p className="price">
                {game.Price !== undefined && game.Price !== null
                  ? `${Number(game.Price).toLocaleString("vi-VN")}₫`
                  : "Liên hệ"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
