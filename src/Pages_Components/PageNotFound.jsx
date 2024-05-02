import NavigationBar from "./nav";

const PageNotFound = () => {
  return (
    <>
      <title>Page not found</title>
      <meta name="description" content="The requested Page is not found" />

      <NavigationBar />
      <main className="pt-[10px] flex justify-center min-h-screen">
        <section className="p-4 max-w-[700px]">
          <p className="text-center text-[10rem] font-bold flex items-center justify-center max-[412px]:text-[6rem] gap-3 min-[600px]:gap-12">
            <span>4</span>
            <img
              src="/404_image.webp"
              alt="A cat viewing a tablet"
              className="inline rounded-full w-[120px] h-[120px] max-[412px]:w-[70px] max-[412px]:h-[70px] max-[412px]:mt-3 mt-5 ring-8 ring-[#213547] dark:ring-white"
            />
            <span>4</span>
          </p>
          <p className="text-center">
            Oops! We could not find the page you were looking for.
          </p>
        </section>
      </main>
    </>
  );
};

export default PageNotFound;
