import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import axiosClient from "../utils/axiosSetup.js";
import { userAction } from "../reduxFiles/actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
const SignUp = ({ setShowSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // This function runs to sign up a user
  const signUp = async () => {
    setSignUpLoading(true);

    if (password.trim() && confirmPassword.trim() && email.trim()) {
      if (password.trim() === confirmPassword.trim()) {
        try {
          const response = await axiosClient.post("/api/signup", {
            email,
            password,
          });

          console.log(email, password);
          console.log(await response.data);

          if (response.status === 201) {
            const response = await axiosClient.post("/api/login", {
              email,
              password,
            });

            console.log("Login request", console.log(await response.data));

            if (response.status === 200) {
              const response = await axiosClient.get("/api/user");

              console.log("Response in getting user", await response.data);

              if (response.status === 200) {
                dispatch(userAction({ userEmail: await response.data.email }));
              }

              // Then reset everything back to default
              setEmail("");
              setPassword("");
              setConfirmPassword("");

              // Hide the signup form
              setShowSignup(false);
              setSignUpLoading(false);

              navigate("/contacts");
            } else {
              throw new Error("Something went wrong");
            }
          } else {
            throw new Error("Something went wrong");
          }
        } catch (e) {
          console.log(e);
          setSignUpLoading(false);
        }
      }
    }
  };

  return (
    <div className="bg-white fixed z-[1] top-0 left-0 w-full h-full">
      <section className="flex justify-center">
        <div className="flex-[0_1_614px] relative">
          <h1
            id="gradient-text"
            className="text-center text-3xl font-bold mt-16"
          >
            Sign up
          </h1>

          <form
            className="p-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col-reverse mb-8 relative mt-8">
              <input
                type="email"
                required
                placeholder=" "
                id="email"
                disabled={signUpLoading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="email"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <MdOutlineEmail className="" />
                  <span>
                    Email&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16">
              <input
                type="password"
                required
                placeholder=" "
                disabled={signUpLoading}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="password"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <RiLockPasswordLine className="" />
                  <span>
                    Password&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16">
              <input
                type="password"
                required
                placeholder=" "
                id="confirmPassword"
                disabled={false}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="confirmPassword"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <RiLockPasswordLine className="" />
                  <span>
                    Confirm Password&nbsp;
                    <span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={() => {
                  if (!signUpLoading) {
                    signUp();
                  }
                }}
                disabled={signUpLoading}
                className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
                <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <CiLogin className="text-2xl" /> <span>Sign up</span>
                  </span>
                </span>
              </button>
            </div>
          </form>
          <button
            type="button"
            className="absolute right-3 top-7"
            onClick={() => {
              setShowSignup(false);
            }}
          >
            <FaWindowClose className="text-4xl" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
