import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function UserProfile() {
  const [fileName, setFileName] = useState();
  const [profileInfo, setProfileInfo] = useState({
    fullName: "",
    length: "",
    email: ""
  });
  const [isError, setIsError] = useState(false);

  const handleProfile = async () => {
    try {
      let { data } = await axios.get(
        "http://localhost:3000/user/profile",

        {
          withCredentials: true
        }
      );
      let profile = await axios.get("http://localhost:3000/profile", {
        withCredentials: true
      });

      setProfileInfo({
        fullName: data.fullName,
        length: data.length,
        email: data.email
      });

      console.log(data);

      setFileName(profile.data.fileName);
    } catch (error) {
      if (error) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#e0f7fa] to-[#f3e8ff] flex flex-col items-center py-20 px-4">
      {/* Card */}
      <div className="max-w-5xl w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 flex flex-col md:flex-row items-center md:items-start gap-10 p-10">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-md">
          <img
            src={`http://localhost:3000/images/${fileName}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-800">
              {profileInfo.fullName}
            </h1>
            <span className="px-3 py-1 text-sm rounded-full bg-indigo-600 text-white font-semibold">
              User
            </span>
          </div>

          <p className="text-gray-700 text-lg max-w-xl">
            Mail : {profileInfo.email}
          </p>

          <NavLink to="update" className="w-fit">
            <button
              disabled={fileName}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition ${
                fileName ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              ✏️ Update Profile
            </button>
          </NavLink>
        </div>

        {/* Stats */}
        <div className="text-center mt-4 md:mt-0">
          <h2 className="text-gray-600 text-lg">Posts</h2>
          <div
            className={`text-3xl font-bold ${
              isError || profileInfo.length === 0
                ? "text-red-500"
                : "text-green-600 "
            } `}
          >
            {profileInfo.length}
          </div>
        </div>
      </div>
    </main>
  );
}
