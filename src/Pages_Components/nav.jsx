import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../reduxFiles/selectors";
import { userAction } from "../reduxFiles/actions";
import axiosClient from "../utils/axiosSetup";

const NavigationBar = () => {
  let user = useSelector(userSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosClient.get("/api/user");

      if (response.status === 200) {
        dispatch(userAction({ userEmail: await response.data.email }));
      }
    };

    try {
      getUser();
    } catch {
      dispatch(userAction({ userEmail: null }));
    }
  }, [user, dispatch]);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const signOut = async () => {
    try {
      const response = await axiosClient.post("/api/logout");
      if (response.status == 200) {
        dispatch(userAction({ userEmail: null }));
        navigate("/");
      }
    } catch (e) {
      console.log("The error", e);
    }
  };

  return (
    <nav className="p-2 pt-4">
      {user ? (
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
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="inline-flex items-center justify-center px-1 py-1 w-[90px] text-sm min-[480px]:text-base min-[480px]:w-[140px] min-[480px]:px-3 font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
            >
              Sign out
            </button>
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
