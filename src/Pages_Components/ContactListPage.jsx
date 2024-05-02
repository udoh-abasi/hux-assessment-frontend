import { Link } from "react-router-dom";
import NavigationBar from "./nav";
import { MdDelete } from "react-icons/md";

const ContactList = () => {
  return (
    <>
      <NavigationBar />

      <section className="min-h-screen">
        <h1 id="gradient-text" className="text-center text-3xl font-bold mt-8">
          All contacts
        </h1>

        <article className="p-4 pt-0 flex justify-center">
          <ul className="flex-[0_1_614px]">
            <li className="mt-6">
              <figure className="flex items-center justify-center shadow-[0px_5px_15px_rgb(75,0,130)] rounded-2xl p-2">
                <Link
                  to="#"
                  className="rounded-full overflow-hidden mr-4 flex-[0_0_40px] h-[40px]"
                >
                  <img
                    alt="placeholder image"
                    src="/Profile_Image_Placeholder-small.jpg"
                  />
                </Link>

                <Link to="#" className="flex-[0_0_70%]">
                  <p id="one-line-ellipsis">
                    Udoh Ab Udoh b Udoh Ab Udoh b Udoh Ab Udoh b Udoh Ab Udoh b{" "}
                  </p>
                </Link>

                <button title="Delete" type="button" className="flex-[0_0_0%]">
                  <MdDelete className="text-4xl" />
                </button>
              </figure>
            </li>

            <li className="mt-6">
              <figure className="flex items-center justify-center shadow-[0px_5px_15px_rgb(75,0,130)] rounded-2xl p-2">
                <Link
                  to="#"
                  className="rounded-full overflow-hidden mr-4 flex-[0_0_40px] h-[40px]"
                >
                  <img
                    alt="placeholder image"
                    src="/Profile_Image_Placeholder-small.jpg"
                  />
                </Link>

                <Link to="#" className="flex-[0_0_70%]">
                  <p id="one-line-ellipsis">Mary</p>
                </Link>

                <button title="Delete" type="button" className="flex-[0_0_0%]">
                  <MdDelete className="text-4xl" />
                </button>
              </figure>
            </li>

            <li className="mt-6">
              <figure className="flex items-center justify-center shadow-[0px_5px_15px_rgb(75,0,130)] rounded-2xl p-2">
                <Link
                  to="#"
                  className="rounded-full overflow-hidden mr-4 flex-[0_0_40px] h-[40px]"
                >
                  <img
                    alt="placeholder image"
                    src="/Profile_Image_Placeholder-small.jpg"
                  />
                </Link>

                <Link to="#" className="flex-[0_0_70%]">
                  <p id="one-line-ellipsis">
                    Udoh Ab Udoh b Udoh Ab Udoh b Udoh Ab Udoh b Udoh Ab Udoh b{" "}
                  </p>
                </Link>

                <button title="Delete" type="button" className="flex-[0_0_0%]">
                  <MdDelete className="text-4xl" />
                </button>
              </figure>
            </li>
          </ul>
        </article>
      </section>
    </>
  );
};
export default ContactList;
