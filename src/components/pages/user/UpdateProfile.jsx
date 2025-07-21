import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const handleFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let data = await axios.post(
      "http://localhost:3000/profileUpdate",
      formData,
      {
        withCredentials: true
      }
    );
    if (data) {
      navigate("/user/profile");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#796CEF] to-[#18BCFE] px-4">
      <div className="w-full max-w-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Update Profile</h1>

        <form className="space-y-6" onSubmit={handleFile}>
          {/* Profile Image Upload */}
          <div>
            <label className="block text-lg mb-1" htmlFor="file">
              Upload Profile Image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 text-white bg-white/10 border border-white/30 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </main>
  );
}
