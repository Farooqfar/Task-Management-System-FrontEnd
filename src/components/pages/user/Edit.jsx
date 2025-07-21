import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id, title, description } = useParams();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [UpdateValue, setUpdateValue] = useState({
    id: id,
    title: title,
    description: description
  });

  const handleUpdate = (e) => {
    let { name, value } = e.target;
    setUpdateValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);
    try {
      let data = await axios.post(
        "http://localhost:3000/user/update",
        UpdateValue,
        {
          withCredentials: true
        }
      );
      if (data) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdate(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#796CEF] to-[#18BCFE] px-4">
      <div className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Update Task</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-lg mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
              placeholder="Edit title"
              value={UpdateValue.title}
              onChange={handleUpdate}
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-lg mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70 resize-none"
              placeholder="Edit description"
              value={UpdateValue.description}
              onChange={handleUpdate}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            {isUpdate ? "Updating" : "Task Update "}
          </button>
        </form>
      </div>
    </main>
  );
}
