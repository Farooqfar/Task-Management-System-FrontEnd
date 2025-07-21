import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Bounce, toast } from "react-toastify";
import axios from "axios";
export default function LoginUser() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔐 Add login logic here
    try {
      const data = await axios.post("http://localhost:3000/login", form, {
        withCredentials: true
      });
      console.log(data);
      toast.success("login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });

      if (data) {
        setTimeout(() => {
          navigate("/user");
        }, 100);
      }
    } catch (error) {
      console.log(error);
      toast.error("UserName Or Password Incorrect", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="relative w-full max-w-md p-8 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40">
        {/* Floating Icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">🔐</span>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-purple-700 mt-8 mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to your TaskManager account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
