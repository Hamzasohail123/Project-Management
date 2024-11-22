import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-indigo-600 p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* Left side - Space Menu */}
        <div>
          <h1 className="text-white text-2xl font-semibold">Workspace Menu</h1>
        </div>

        {/* Right side - Login Button */}
        <div>
          <Link to="/login" className="text-white border-2 border-white px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-all">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
