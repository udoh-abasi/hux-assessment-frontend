import { Link } from "react-router-dom";
import NavigationBar from "./nav";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosSetup";
import Loader from "./loader";

const ContactList = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [allcontactsData, setAllCOntactData] = useState([]);

  useEffect(() => {
    // On page refresh, or when we navigate to this page, we want to make this request to get all contacts saved by the user
    const getAllContacts = async () => {
      try {
        const response = await axiosClient.get("/api/allcontacts");

        const data = await response.data;

        // If everything went well, set the data in a state
        setAllCOntactData(data);

        // This will make the loader disappear
        setDataLoading(false);
      } catch (e) {
        setDataLoading(false);
      }
    };

    getAllContacts();
  }, []);

  // When the 'delete' button is clicked, this function runs
  const deleteData = async (contactID) => {
    try {
      const response = await axiosClient.delete(`/api/delete/${contactID}`);

      if (response.status === 200) {
        // If everything went well, we filter through the contacts and remove the deleted contact
        const newAllContactsData = allcontactsData.filter(
          (contact) => contact.id !== contactID
        );

        setAllCOntactData([...newAllContactsData]);
      }
    } catch (e) {
      //
    }
  };

  return (
    <>
      <NavigationBar />

      <section className="min-h-screen">
        <h1 id="gradient-text" className="text-center text-3xl font-bold mt-8">
          All contacts
        </h1>

        {dataLoading ? (
          <div className="text-center pt-10">
            {" "}
            <Loader />
          </div>
        ) : allcontactsData.length ? (
          <article className="p-4 pt-0 flex justify-center">
            <ul className="flex-[0_1_614px]">
              {allcontactsData.map((eachData, i) => {
                return (
                  <li className="mt-6" key={i}>
                    <figure className="flex items-center justify-center shadow-[0px_5px_15px_rgb(75,0,130)] rounded-2xl p-2">
                      <Link
                        to={`/contactdetails/${eachData.id}`}
                        className="rounded-full overflow-hidden mr-4 flex-[0_0_40px] h-[40px]"
                      >
                        <img
                          alt="placeholder image"
                          src="/Profile_Image_Placeholder-small.jpg"
                        />
                      </Link>

                      <Link
                        to={`/contactdetails/${eachData.id}`}
                        className="flex-[0_0_70%]"
                      >
                        <p id="one-line-ellipsis">
                          {eachData.firstName} {eachData.lastName}
                        </p>
                      </Link>

                      <button
                        title="Delete"
                        type="button"
                        onClick={() => {
                          deleteData(eachData.id);
                        }}
                        className="flex-[0_0_0%]"
                      >
                        <MdDelete className="text-4xl" />
                      </button>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </article>
        ) : (
          <p className="text-center text-xl italic mt-10 font-bold p-2">
            You have not created a contact yet!
          </p>
        )}
      </section>
    </>
  );
};
export default ContactList;
