import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import User from "./User.js";
import Admin from "./Admin.js";
import "../styles/App.css";
import React from "react";
import Edit from './Edit.js';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="pages/Register.js" element={<Register />} />
        <Route path="pages/User.js" element={<User />} />
        <Route path="pages/Admin.js" element={<Admin />} />
        <Route path="pages/Edit.js" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

