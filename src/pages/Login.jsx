// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data);
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Fullscreen Image with Overlay */}
      <div className="md:w-1/2 relative h-80 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/sikkim_login.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-800/60 via-amber-700/50 to-green-800/60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg md:text-2xl text-white drop-shadow-md max-w-md">
            Login to manage tours and explore Sikkim’s stunning landscapes.
          </p>

          {/* Floating accents */}
          <div className="absolute -bottom-10 left-10 w-24 h-24 bg-amber-400 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* Right: Integrated Form with Modern Design */}
      <div className="md:w-1/2 flex items-center justify-center p-12 bg-gradient-to-tr from-orange-50 via-amber-50 to-green-50 relative">
        <div className="w-full max-w-md relative z-10">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-extrabold text-green-700 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-700">
              Access your dashboard to manage tours and bookings seamlessly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
  type="email"
  placeholder="admin@sikkim360.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm placeholder-gray-400"
/>
<input
  type="password"
  placeholder="ADMIN1234"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm placeholder-gray-400"
/>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-500 text-center">
            Forgot your password?{" "}
            <a href="#" className="text-green-600 font-medium hover:underline">
              Reset here
            </a>
          </p>

          {/* Floating subtle background shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
