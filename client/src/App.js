import { useState, useEffect } from "react";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Header } from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddSales } from './pages/AddSales';
import { TopSales } from './pages/TopSales';
import { Revenue } from './pages/Revenue';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Logout } from "./pages/Logout";
import { Footer } from "./components/Footer";
import PrivateRoute from "./AuthRoute/PrivateRoute";
import SalesHistory from "./pages/SalesHistory";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<AddSales />} />
            <Route path="/topSales" element={<TopSales />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/salesByDate" element={<SalesHistory />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  );
}
export default App;
