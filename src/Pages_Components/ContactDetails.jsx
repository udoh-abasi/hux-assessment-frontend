import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./nav";
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosSetup";
import Loader from "./loader";

const ContactDetails = () => {
  const navigate = useNavigate();

  // We get the id from the URL parameters
  const { contactID } = useParams();

  const [dataLoading, setDataLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    // On page refresh, or when we navigate to this page, we want to make this request
    const getContactDetails = async () => {
      try {
        // Get the the contact's details
        const response = await axiosClient.get(
          `/api/contactdetails/${contactID}`
        );

        const data = await response.data;

        // set the contact's details in a state
        setContactDetails(data);

        // This will make the loader disappear
        setDataLoading(false);
      } catch (e) {
        setDataLoading(false);

        // If something went wrong, return the user to the home page
        navigate("/");
      }
    };

    getContactDetails();
  }, [contactID, navigate]);

  // When the 'delete' button is clicked, this function runs
  const deleteContact = async (contactID) => {
    try {
      // Send a request to delete the contact
      const response = await axiosClient.delete(`/api/delete/${contactID}`);

      if (response.status === 200) {
        // If everything went well, take the user back to the page to see all contacts
        navigate("/contacts");
      }
    } catch (e) {
      //
    }
  };

  return (
    <>
      <NavigationBar />

      <main className="min-h-full">
        <h1 id="gradient-text" className="text-center text-3xl font-bold mt-8">
          Contact Details
        </h1>

        {dataLoading ? (
          <div className="text-center pt-10">
            {" "}
            <Loader />
          </div>
        ) : (
          <section className="p-4 flex justify-center pt-8">
            <div className="flex-[0_1_630px]">
              <div className="flex justify-center items-center">
                <figure className="rounded-full overflow-hidden h-[100px] w-[100px]">
                  <img
                    alt="placeholder image"
                    src="/Profile_Image_Placeholder-small.jpg"
                  />
                </figure>
              </div>

              <article className="flex mt-6">
                <p className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]">
                  First name
                </p>
                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {contactDetails.firstName}
                </p>
              </article>

              <article className="flex mt-6">
                <p className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]">
                  Last name
                </p>
                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {contactDetails.lastName}
                </p>
              </article>

              <article className="flex mt-6">
                <p
                  type="text"
                  className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]"
                >
                  Phone Number
                </p>

                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {contactDetails.phoneNumber}
                </p>
              </article>

              <div className="pt-16 flex justify-center gap-4 min-[520px]:gap-16">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/edit/${contactID}`);
                  }}
                  title="Edit"
                  className="hover:ring-indigo-500 ring-purple-500 ring-4 w-[140px] py-1 rounded-bl-2xl rounded-tr-2xl font-bold text-lg"
                >
                  Edit
                </button>

                <button
                  type="button"
                  title="Delete"
                  onClick={() => {
                    deleteContact(contactID);
                  }}
                  className="ring-red-500 ring-4 w-[140px] py-1 rounded-bl-2xl rounded-tr-2xl font-bold text-lg text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ContactDetails;
