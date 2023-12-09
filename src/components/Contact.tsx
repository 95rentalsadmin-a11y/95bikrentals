import React from "react";

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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Suscipit nobis placeat nisi dignissimos voluptatem totam
                delectus mollitia, perspiciatis rerum voluptatum voluptates
                expedita quam non nesciunt praesentium. Amet in illo
                repellendus?
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-Inter text-xl">Contact Number: </h5>
              <p>+91 78419 42095</p>
            </div>
          </div>
          <div className="w-full">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.937487879529!2d73.77117357586852!3d19.96913102332675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb38e6f9e519%3A0xc2848e66522d59a3!2sRajiv%20Nagar%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1702121932738!5m2!1sen!2sin"
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
