import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking

  const checkAuth = async () => {
    try {
      await axios.get("http://localhost:3000/auth/check", {
        withCredentials: true
      });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="text-center mt-20 text-lg">
        Checking authentication...
      </div>
    );
  }

  if (isAuthenticated === false) return null;

  return children;
}
