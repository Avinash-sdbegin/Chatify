import { Link } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { authStore } from "../store/authStore";
import { getProfilePicture } from "../lib/utils";

const Navbar = () => {
  const { logout, loggedUser } = authStore();
  return (
    <nav className="sticky top-0 z-50 h-16 bg-gray-900 px-5 flex items-center justify-between shadow-lg lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-white text-2xl hover:text-blue-200 transition flex shadow-md"
          title="Messages"
        >


          <span className="p-2 font-bold">
            <FiMessageSquare className="text-4xl text-blue-600 animate-pulse bg-blue-900 p-2 rounded-lg" />
          </span>


          <span className="text-2xl py-2 font-bold text-blue-500 tracking-wide drop-shadow-lg select-none">
            Chatify
          </span>


        </Link>

      </div>

      <div className="flex items-center gap-4">
        {loggedUser ? (
          <>
            <Link
              to="/profile"
              className="flex flex-row items-center text-white hover:text-blue-200 transition"
              title="Profile"
            >
              <img
                src={getProfilePicture(loggedUser.profilepic, loggedUser.username)}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xs ml-2">Profile</span>
            </Link>

            <button
              className="flex flex-row items-center text-white hover:text-red-300 transition"
              title="Logout"
              onClick={logout}
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-xs ml-2">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-200 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-gray-900 bg-gray-200 hover:bg-white transition px-3 py-1.5 rounded-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;