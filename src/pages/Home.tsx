import React from "react";
import Cities from "../components/Cities";
import Bikes from "../components/Bikes";

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
              <li className="hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="" className=" font-Inter font-semibold ">
                  Cities
                </a>
              </li>
              <li className="hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="" className="font-Inter font-semibold">
                  Our Fleet
                </a>
              </li>
              <li className="hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="" className="font-Inter font-semibold">
                  Why choose us?
                </a>
              </li>
              <li className="hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="" className="font-Inter font-semibold">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex h-full justify-end items-center">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <h1 className="text-5xl font-merriweather text-zinc-50 font-extrabold text-center leading-normal shadow-lg">
                Ride in Style, Rent with Ease
              </h1>
              <button className="bg-lime-green py-3 px-5 my-8 rounded-full shadow-lg font-Inter font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Cities />
      <Bikes />
      <footer></footer>
    </>
  );
};

export default Home;
