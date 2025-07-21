import { NavLink } from "react-router-dom";
import page404 from "../../assets/undraw_towing_e407.svg";
export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-8xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <NavLink
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go Home
        </NavLink>
      </div>

      <div className="mt-10">
        <img
          src={page404}
          alt="404 Not Found"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
}
