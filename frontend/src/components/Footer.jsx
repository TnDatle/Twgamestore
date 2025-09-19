import React from "react";
import "../styles/Footer.css";
import logo from "../images/Logo.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Cột 1: Giới thiệu + liên hệ */}
        <div className="footer-column">
          <img src={logo} alt="TWGameStore" className="footer-logo" />
          <p>
            TWGameStore - Cửa hàng Game Console cao cấp tại TP.HCM.  
            Chuyên PlayStation, Nintendo Switch, Xbox và các hệ máy handheld.
          </p>
          <h4>MUA HÀNG - GÓP Ý</h4>
          <ul>
            <li>Hotline: <span className="highlight">02873068666</span></li>
            <li>Email: sales@twgamestore.vn</li>
            <li>Website: twgamestore.vn</li>
            <li>Zalo: TWGAMESTORE OA</li>
          </ul>
        </div>

        {/* Cột 2: Địa chỉ + giờ làm việc */}
        <div className="footer-column">
          <h4>ĐỊA CHỈ</h4>
          <ul>
            <li>18A Cộng Hòa, P. Tân Sơn Nhất, TP.HCM</li>
            <li>12 Hòa Hưng, P. Hòa Hưng, TP.HCM</li>
          </ul>
          <h4>THỜI GIAN LÀM VIỆC</h4>
          <ul>
            <li>T2 - T7: 9h - 20h</li>
            <li>CN & Ngày lễ: 9h - 19h</li>
          </ul>
        </div>

        {/* Cột 3: Social */}
        <div className="footer-column">
          <h4>THEO DÕI TWGAMESTORE</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Hội PS5 Việt Nam</a>
            <a href="#">Zalo</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        {/* Cột 4: Chính sách */}
        <div className="footer-column">
          <h4>THÔNG TIN</h4>
          <ul>
            <li>Quy định chung</li>
            <li>Mua hàng trả góp</li>
            <li>Quy định đặt cọc</li>
            <li>Quy định bảo hành</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi / trả hàng</li>
            <li>Trung tâm bảo hành</li>
            <li>Tuyển dụng</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 TWGameStore, All Rights Reserved , Made by Le Tan Dat</p>
      </div>
    </footer>
  );
}
