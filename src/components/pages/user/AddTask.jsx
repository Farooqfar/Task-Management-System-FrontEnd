import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3000/user/add",
        formData,
        {
          withCredentials: true
        }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        title: "",
        description: ""
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#796CEF] to-[#18BCFE] px-4">
      <div className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Add New Task</h1>

        <form className="space-y-6" onSubmit={handleForm}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleInput}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lg mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Write your task description..."
              value={formData.description}
              onChange={handleInput}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70 resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </main>
  );
}
