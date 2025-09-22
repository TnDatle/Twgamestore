import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../images/Logo.jpg";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  // State cho dropdown
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="TWGameStore" />
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm game..." />
          <button>Tìm</button>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
            
            {/* Sản Phẩm */}
            <li
              className="dropdown"
              onMouseEnter={() => setShowProductDropdown(true)}
              onMouseLeave={() => setShowProductDropdown(false)}
            >
              <Link to="#">Sản Phẩm</Link>
              {showProductDropdown && (
                <ul className="dropdown-menu horizontal">
                  <li><Link to="/pages/Game">Game</Link></li>
                  <li><Link to="/pages/Console">Máy Game</Link></li>
                  <li><Link to="/pages/OldConsole">Máy Cũ</Link></li>
                  <li><Link to="/pages/Apple">Apple</Link></li>
                  <li><Link to="/pages/Accesories">Phụ Kiện Game</Link></li>
                </ul>
              )}
            </li>

            {/* Chủ Đề Game */}
            <li
              className="dropdown"
              onMouseEnter={() => setShowTopicDropdown(true)}
              onMouseLeave={() => setShowTopicDropdown(false)}
            >
              <Link to="#">Chủ Đề Game</Link>
              {showTopicDropdown && (
                <ul className="dropdown-menu horizontal">
                  <li><Link to="/about/pc">PC</Link></li>
                  <li><Link to="/about/mobile">Mobile</Link></li>
                  <li><Link to="/about/console">Console</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/contact">Liên Hệ</Link></li>
          </ul>
        </nav>

        {/* Đăng nhập + Giỏ hàng */}
        <div className="header-right">
          <div className="login">
            <Link to="/pages/Login">
              <i className="fas fa-user"></i> Đăng nhập
            </Link>
          </div>
          <div className="cart">
            <Link to="/pages/cart">
              <div className="cart-icon-wrapper">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
