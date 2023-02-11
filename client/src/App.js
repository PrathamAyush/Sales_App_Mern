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
function App  ()  {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AddSales />} />
          <Route path="/topSales" element={<TopSales />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}
export default App;
