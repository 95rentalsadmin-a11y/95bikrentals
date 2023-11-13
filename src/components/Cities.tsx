import React from "react";
import nashik from "../assets/images/nashik.jpeg";

const Cities = () => {
  return (
    <div className="py-12 max-w-6xl px-4 mx-auto">
      <h2 className="text-3xl text-center font-merriweather font-bold">
        Cities
      </h2>
      <div className="flex justify-center my-8">
        <div className="w-1/3">
          <img className="rounded-lg" src={nashik} alt="" />
          <h5 className="text-xl text-center my-3 font-merriweather font-medium">
            Nashik
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Cities;
