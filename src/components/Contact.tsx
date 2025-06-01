import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-lime-green py-12">
      <div className="max-w-6xl px-4 mx-auto">
        <h3 className="font-merriweather text-3xl text-center font-bold">
          Contact Us
        </h3>
        <div className="flex flex-col md:flex-row py-14 gap-8">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3">
              <h5 className="font-Inter text-xl">Address: </h5>
              <p className="text-lg font-Inter font-light">
                95 Bike Rentals
                <br />
                Vivekanand Nagar, Near Guruji Hospital, Gangapur Road,
                Anandavalli, Nashik - 422013
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-Inter text-xl">Contact Number: </h5>
              <p>+91 7410192695</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/privacy-policy" className="font-Inter">Privacy Policy</Link>
            </div>
          </div>
          <div className="w-full">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.9555451671677!2d73.7470471!3d20.010380399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdded04eae2ba0b%3A0x92aff5db33314a2c!2s95%20bike%20rentals!5e0!3m2!1sen!2sin!4v1702125780348!5m2!1sen!2sin"
              className="w-full"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <footer className="flex items-center justify-center pt-8">
          <p className="font-Inter font-medium text-center">
            95BikeRentals &copy; Copyright 2023. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
