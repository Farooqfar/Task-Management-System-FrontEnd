import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
  const [fileName, setFileName] = useState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.get("http://localhost:3000/logout", {
      withCredentials: true
    });

    navigate("/login");
  };

  const handleProfile = async () => {
    let profile = await axios.get("http://localhost:3000/profile", {
      withCredentials: true
    });
    setFileName(profile.data.fileName);
  };
  useEffect(() => {
    handleProfile();
  }, []);
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Management System</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`http://localhost:3000/images/${fileName}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink className="justify-between" to="profile">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
