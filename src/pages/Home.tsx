import React, { useState } from "react";
import Cities from "../components/Cities";
import Bikes from "../components/Bikes";
import { FaArrowRight } from "react-icons/fa";
import Contact from "../components/Contact";
import Iternary from "../assets/images/iternary.jpeg";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const downloadIternary = () => {
    const link = document.createElement("a");
    link.href = "/iternary.pdf";
    link.download = "iternary.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <div className="bg-hero">
        <div className="max-w-6xl px-4 mx-auto h-[100vh]">
          <nav className="flex justify-between items-center md:sticky top-0  py-8 ">
            <a href="/">
              <h1 className="font-rubik text-xl md:text-3xl font-bold text-black">
                95BikeRentals<span className="text-lg">.in</span>
              </h1>
            </a>
            <ul className="flex justify-end gap-8 items-center">
              <li className="hidden md:block hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="#cities" className=" font-Inter font-semibold ">
                  Cities
                </a>
              </li>
              <li className="hidden md:block hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="#our-fleet" className="font-Inter font-semibold">
                  Our Fleet
                </a>
              </li>
              <li className="hidden md:block hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="#itinerary" className="font-Inter font-semibold">
                  Itinerary
                </a>
              </li>
              {/* <li className="hidden md:block hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="#why-choose-us" className="font-Inter font-semibold">
                  Why choose us?
                </a>
              </li> */}
              <li className="hidden md:block hover:bg-primaryColor text-black hover:text-white transition-all">
                <a href="#contact-us" className="font-Inter font-semibold">
                  Contact Us
                </a>
              </li>
              <li className="mt-2">
                <button
                  id="menu-btn"
                  onClick={toggleMenu}
                  className={`block ${
                    showMenu ? "open" : ""
                  } hamburger md:hidden focus:outline-none`}
                >
                  <span className="hamburger-top dark:bg-white"></span>
                  <span className="hamburger-middle dark:bg-white"></span>
                  <span className="hamburger-bottom dark:bg-white"></span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <div
              id="menu"
              className={`absolute flex flex-col items-center self-end ${
                showMenu ? "translate-x-0 left-8" : "-translate-x-full left-0"
              } py-8 space-y-6 font-bold bg-white bg-opacity-90 sm:w-auto sm:self-center right-8 drop-shadow-md`}
            >
              <a href="#cities">Cities</a>
              <a href="#our-fleet">Our Fleet</a>
              <a href="#itinerary">Itinerary</a>
              {/* <a href="#why-choose-us">Why choose us?</a> */}
              <a href="#contact-us">Contact Us</a>
            </div>
          </div>
          <div className="flex h-full justify-end items-center">
            <div className="md:w-1/2 flex flex-col justify-center items-center -mt-16 bg-white bg-opacity-70 px-4 py-8 rounded-3xl shadow-2xl">
              <h1
                className="text-3xl md:text-5xl font-merriweather text-zinc-700 font-extrabold text-center "
                style={{ lineHeight: "4rem" }}
              >
                Ride in Style, Rent with Ease
              </h1>
              <p className="text-center font-rubik font-light mt-4 text-lg md:text-xl">
                Welcome to 95BikeRentals.in, where every bike is a gateway to
                new experiences. Rent a bike and redefine the way you explore
                the world around you.
              </p>
              <a
                className="bg-lime-green py-3 px-5 my-8 rounded-full shadow-lg font-Inter font-semibold flex items-center gap-3 hover:bg-sunny-yellow transition-all"
                href="#our-fleet"
              >
                <span>Book Now</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="cities">
        <Cities />
      </div>
      <div id="our-fleet">
        <Bikes />
      </div>
      <div id="itinerary" className="py-12 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl text-center font-merriweather font-bold mb-4">
            Itinerary
          </h2>
          <p className="text-center text-gray-600 font-rubik text-lg mb-12 max-w-2xl mx-auto">
            Download our detailed itinerary guide to plan your perfect journey.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-80 flex items-center justify-center border-2 border-dashed border-gray-300">
                <img src={Iternary} alt="Itinerary" />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-start gap-6">
              <h3 className="text-2xl font-merriweather font-bold text-gray-800">
                Plan Your Perfect Ride
              </h3>
              <p className="text-gray-700 font-rubik leading-relaxed">
                Our comprehensive itinerary includes the best routes, scenic spots, and bike-friendly locations across the city. Whether you're a beginner or an experienced rider, we have the perfect route for you.
              </p>
              <button
                onClick={downloadIternary}
                className="bg-turquoise-blue px-8 py-3 rounded-full text-white font-Inter font-semibold hover:bg-lime-green hover:text-black transition-all shadow-lg"
              >
                Download Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="contact-us">
        <Contact />
      </div>
      <footer></footer>
    </>
  );
};

export default Home;
