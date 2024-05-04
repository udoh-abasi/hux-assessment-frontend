import NavigationBar from "./nav";
import { RiContactsLine } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosSetup";

const EditContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [editLoading, setEditLoading] = useState(false);

  const navigate = useNavigate();

  // Get the contact's ID from the URL parameter
  const { contactID } = useParams();

  useEffect(() => {
    // On page load, this will run to get the contact the user wants to edit
    const getContactDetails = async () => {
      try {
        const response = await axiosClient.get(
          `/api/contactdetails/${contactID}`
        );

        const data = await response.data;

        // If everything went well, set the data in the input fields
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setEditLoading(false);
      } catch (e) {
        // If anything went wrong, send the user back to the home page
        setEditLoading(false);
        navigate("/");
      }
    };

    getContactDetails();
  }, [contactID, navigate]);

  // When the 'Save edit' button is clicked, this function runs to save the edited contact
  const saveEdit = async () => {
    try {
      const response = await axiosClient.put(`/api/edit/${contactID}`, {
        firstName,
        lastName,
        phoneNumber,
      });

      // If everything went well, we navigate the user back to see the details of the edited contact
      if (response.status === 200) {
        navigate(`/contactdetails/${contactID}`);
      }
    } catch (e) {
      //
    }
  };

  return (
    <>
      <NavigationBar />

      <section className="flex justify-center min-h-full">
        <div className="flex-[0_1_614px]">
          <h1
            id="gradient-text"
            className="text-center text-3xl font-bold mt-8"
          >
            Edit contact
          </h1>

          <form className="p-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col-reverse mb-8 relative mt-8">
              <input
                type="text"
                required
                placeholder=" "
                id="firstName"
                disabled={editLoading}
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                onClick={() => {
                  saveEdit();
                }}
                className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
                <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <IoIosCreate className="text-2xl" /> <span>Save edit</span>
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
export default EditContact;
