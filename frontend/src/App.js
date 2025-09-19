import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import Console from "./pages/Console";
import OldConsole from "./pages/OldConsole";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/pages/Game" element={<Game />} />
      <Route path="/pages/Cart" element={<Cart />} />
      <Route path="/pages/Console" element={<Console />}></Route>
      <Route path="/pages/OldConsole" element={<OldConsole />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
