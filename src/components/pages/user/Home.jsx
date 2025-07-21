import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import nodata from "../../../assets/nodata.svg";
export default function Home() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleData = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/user", {
        withCredentials: true
      });

      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:3000/deletePost/${id}`, {
      withCredentials: true
    });

    setUserData((prev) => prev.filter((item) => item._id !== id));
  };
  const filterData = userData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    handleData();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#eef2f3] to-[#cfd9df]">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16 relative">
        {/* Add Task Button */}
        <div className="flex justify-end mb-6 md:mb-8 gap-10 items-center">
          <input
            type="text"
            className="input input-accent"
            placeholder="Search Task"
            name=""
            id=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink to="/user/add">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium md:font-semibold shadow-md transition duration-300 text-sm md:text-base">
              + Add New Task
            </button>
          </NavLink>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {!userData ||
          userData.length === 0 ||
          filterData.length === 0 ||
          !filterData ? (
            <div className="col-span-full flex flex-col items-center">
              <h1 className="text-4xl font-bold text-center text-black text-shadow-amber-500 text-shadow-lg mb-4">
                No Data
              </h1>
              <img src={nodata} alt="No data available" className="max-w-xs" />
            </div>
          ) : (
            filterData.map((items, index) => (
              <div key={index} className=" rounded-2xl p-4">
                {/* Single Task Card */}
                <div className="w-full h-full bg-white/30 backdrop-blur-md border border-white/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Title */}
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
                    📌 {items.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-700 line-clamp-3 md:line-clamp-4 text-sm md:text-base">
                    {items.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-between gap-2">
                    <NavLink
                      to={`edit/${items._id}/${items.title}/${items.description}`}
                      className="w-full sm:w-auto"
                    >
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg transition text-sm md:text-base">
                        Edit
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(items._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg transition text-sm md:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
  );
}
