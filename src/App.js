// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegistForm from "./components/RegistForm";
import { Toaster } from "react-hot-toast";
import TopUp from "./pages/Topup";
import Transaction from "./pages/Transaction";
import Akun from "./pages/Akun";
import Service from "./pages/Service";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistForm />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/service/:id" element={<Service />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
