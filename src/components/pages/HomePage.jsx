import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-600">TaskManager</h1>
        <nav className="space-x-6">
          <NavLink
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Register
          </NavLink>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Simplify Your <span className="text-blue-600">Task</span> Workflow
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Plan, track, and complete your tasks efficiently. Start managing
            your productivity with ease today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <NavLink
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} TaskManager · Built with 💙
      </footer>
    </div>
  );
}
