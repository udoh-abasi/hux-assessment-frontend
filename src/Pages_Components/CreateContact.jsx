import NavigationBar from "./nav";
import { RiContactsLine } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { useState } from "react";
import axiosClient from "../utils/axiosSetup";
import { useNavigate } from "react-router";

const CreateContacts = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const navigate = useNavigate();

  const create = async () => {
    setCreateLoading(true);

    if (firstName.trim() && phoneNumber.trim() && lastName.trim()) {
      try {
        const response = await axiosClient.post("/api/create", {
          firstName,
          lastName,
          phoneNumber,
        });

        if (response.status === 201) {
          // Then reset everything back to default
          setPhoneNumber("");
          setFirstName("");
          setLastName("");

          setCreateLoading(false);

          navigate("/contacts");
        } else {
          throw new Error("Something went wrong");
        }
      } catch (e) {
        setCreateLoading(false);
      }
    }
  };

  return (
    <>
      <NavigationBar />

      <section className="flex justify-center">
        <div className="flex-[0_1_614px]">
          <h1
            id="gradient-text"
            className="text-center text-3xl font-bold mt-8"
          >
            Create a contact
          </h1>
          <form className="p-4">
            <div className="flex flex-col-reverse mb-8 relative mt-8">
              <input
                type="text"
                required
                placeholder=" "
                id="firstName"
                disabled={createLoading}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="firstName"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <RiContactsLine className="" />
                  <span>
                    First name&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16">
              <input
                type="text"
                required
                placeholder=" "
                id="lastName"
                disabled={createLoading}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="lastName"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <RiContactsLine className="" />
                  <span>
                    Last name&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16">
              <input
                type="number"
                required
                placeholder=" "
                id="phoneNumber"
                disabled={createLoading}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="phoneNumber"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <MdOutlinePhoneInTalk className="" />
                  <span>
                    Phone number&nbsp;
                    <span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={createLoading}
                onClick={() => {
                  if (!createLoading) {
                    create();
                  }
                }}
                className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
                <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <IoIosCreate className="text-2xl" /> <span>Create</span>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default CreateContacts;
