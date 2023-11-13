import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-hero">
        <div className="max-w-6xl px-4 mx-auto py-8 h-[100vh]">
          <nav className="flex justify-between items-center">
            <a href="/">
              <h1 className="font-rubik text-3xl font-bold text-black">
                95BikeRentals<span className="text-lg">.in</span>
              </h1>
            </a>
            <ul className="flex justify-end gap-8 items-center">
              <li className="hover:bg-primaryColor">
                <a
                  href=""
                  className="text-black font-Inter font-semibold hover:text-white"
                >
                  Cities
                </a>
              </li>
              <li className="hover:bg-primaryColor">
                <a
                  href=""
                  className="text-black font-Inter font-semibold hover:text-white"
                >
                  Our Fleet
                </a>
              </li>
              <li className="hover:bg-primaryColor group-hover:text-white">
                <a
                  href=""
                  className="text-black font-Inter font-semibold hover:text-white"
                >
                  Why choose us?
                </a>
              </li>
              <li className="hover:bg-primaryColor">
                <a
                  href=""
                  className="text-black font-Inter font-semibold hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="px-32 py-8 h-[500px] bg-primaryColor">
        <h2 className="text-center text-4xl font-bold">Cities</h2>
        <div className="flex"></div>
      </div>
      <div className="px-32 py-8 h-[500px] bg-indigo-300">
        <h2 className="text-center text-4xl font-bold">Bikes</h2>
        <div className="flex"></div>
      </div>
      <footer></footer>
    </>
  );
};

export default Home;
