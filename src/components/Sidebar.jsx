import React from "react";
import { Link } from "react-router-dom";
import {
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import Button from "./Button";

function Sidebar() {
  const status = useAuth();
  return (
    <div className="w-52 bg-indigo-600 p-6 shadow-lg">
      <h1 className="text-white text-xl font-semibold">Workspae Menu</h1>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition-all"
            >
              <p>Deshboard</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition-all"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition-all"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition-all"
            >
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition-all"
            >
              Reports
            </Link>
          </li>
        </ul>
      </nav>

      {/* <header className="border mt-48 cursor-pointer px-2 bg-blue-700 w-28 py-2 rounded-lg text-white">
        <Link to='/signin'>
          <SignInButton />
        </Link>
        <SignedIn afterSignOutUrl='/signin'>
          <UserButton
          showName
          className='text-white'
            afterSignOutUrl="/signin" // Redirect to custom sign-in page after sign-out
          />
        </SignedIn>
      </header> */}
      <div className="mt-48">
        {status.isSignedIn ? (
          <div className="bg-white p-4 rounded-md">
            {" "}
            <UserButton showName afterSignOutUrl="/signin"/>
          </div>
        ) : (
          <Link to="/signin">
            <Button text={'Sign In'} className="border px-7 py-3 rounded-md text-white"/>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
