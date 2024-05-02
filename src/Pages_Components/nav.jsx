import { Link } from "react-router-dom";
import Login from "./Login";
import { useState } from "react";
import SignUp from "./SignUp";

const NavigationBar = () => {
  const user = false;

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <nav className="p-2 pt-4">
      {user == true ? (
        <ul className="flex gap-2 justify-end">
          <li>
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-1 py-1 w-[103px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
            >
              Create contact
            </Link>
          </li>

          <li>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center px-1 py-1 w-[90px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
            >
              All contacts
            </Link>
          </li>

          <li>
            <Link
              to="#_"
              className="inline-flex items-center justify-center px-1 py-1 w-[90px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
            >
              Sign out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-2 justify-end">
          <li>
            <button
              type="button"
              className="inline-flex items-center justify-center px-1 py-1 w-[90px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
          </li>

          <li>
            <Link
              to="#"
              className="inline-flex items-center justify-center px-1 py-1 w-[90px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
              onClick={() => {
                setShowSignup(true);
              }}
            >
              Sign up
            </Link>
          </li>

          {showLogin ? <Login setShowLogin={setShowLogin} /> : <span></span>}
          {showSignup ? (
            <SignUp setShowSignup={setShowSignup} />
          ) : (
            <span></span>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavigationBar;
