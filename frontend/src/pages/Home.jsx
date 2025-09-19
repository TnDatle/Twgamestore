import React, { useEffect, useState } from "react";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import "../styles/Home.css";

export default function Home() {
  const banners = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // bắt đầu fade out
      setTimeout(() => {
        setCurrentIndex(prev =>
          prev + 1 >= banners.length ? 0 : prev + 1
        );
        setFade(true); // fade in ảnh mới
      }, 500); // thời gian fade tương ứng CSS transition
    }, 3000); // chuyển slide mỗi 3 giây

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <main className="home">
      <div className="slider">
        <img
          src={banners[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className={`banner-img ${fade ? "fade-in" : "fade-out"}`}
        />
        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </main>
  );
}
