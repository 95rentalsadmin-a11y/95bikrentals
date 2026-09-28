import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import BookingNavbar from '../../components/BookingNavbar';
import { FaCheckCircle, FaHome, FaDownload, FaCalendarAlt, FaClock, FaBicycle, FaMapMarkerAlt } from 'react-icons/fa';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, bookingReference, clearBooking } = useBooking();
  const displayReference = bookingReference
    ? bookingReference.split('-')[0].toUpperCase()
    : 'PENDING';
  const isConfirmed = bookingDetails.bookingStatus === 'confirmed';

  const handleGoHome = () => {
    clearBooking();
    navigate('/');
  };

  if (!bookingDetails.selectedBike) {
    navigate('/booking');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BookingNavbar />
      <div className="py-12">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-lime-green to-sunny-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-5xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 font-rubik">
              {isConfirmed
                ? 'Your booking has been confirmed successfully'
                : 'Your booking request has been received'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-turquoise-blue to-sky-blue rounded-2xl p-6 mb-8">
            <div className="text-center text-white">
              <p className="text-lg font-semibold mb-2">Booking Reference</p>
              <p className="text-3xl font-bold font-Inter">
                #{displayReference}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBicycle className="text-turquoise-blue text-2xl" />
                <h3 className="text-lg font-merriweather font-bold text-gray-800">
                  Bike Details
                </h3>
              </div>
              <img
                src={bookingDetails.selectedBike.image}
                alt={bookingDetails.selectedBike.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h4 className="font-rubik font-bold text-gray-800 text-lg mb-2">
                {bookingDetails.selectedBike.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {bookingDetails.selectedBike.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-turquoise-blue/10 text-turquoise-blue rounded-full text-sm font-Inter"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-turquoise-blue text-2xl" />
                <h3 className="text-lg font-merriweather font-bold text-gray-800">
                  Booking Details
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-Inter">Start Date & Time</p>
                    <p className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.startDate?.toLocaleDateString()} {bookingDetails.startTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-Inter">End Date & Time</p>
                    <p className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.endDate?.toLocaleDateString()} {bookingDetails.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-Inter">Duration</p>
                    <p className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.durationHours.toFixed(1)} hours
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold font-Inter text-gray-800">Total Paid</span>
                    <span className="text-2xl font-bold font-Inter text-turquoise-blue">
                      ₹{bookingDetails.finalTotal || bookingDetails.calculatedRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lime-green/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-merriweather font-bold text-gray-800 mb-4 flex items-center gap-3">
              <FaMapMarkerAlt className="text-lime-green" />
              Pickup Location
            </h3>
            <p className="text-gray-700 font-rubik">
              95BikeRentals Office, Nashik, Maharashtra
            </p>
            <p className="text-sm text-gray-600 font-Inter mt-2">
              Please bring your original ID proof for verification at pickup
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-merriweather font-bold text-gray-800 mb-4">
              Important Information
            </h3>
            <ul className="space-y-3 text-gray-700 font-rubik">
              <li className="flex items-start gap-3">
                <span className="text-turquoise-blue mt-1">•</span>
                <span>Bring your original ID proof (Aadhar/PAN/Driving License)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise-blue mt-1">•</span>
                <span>Wear a helmet (provided with the bike)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise-blue mt-1">•</span>
                <span>Follow traffic rules and regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise-blue mt-1">•</span>
                <span>Return the bike on time to avoid late fees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-turquoise-blue mt-1">•</span>
                <span>Contact us at +91 74101 92695 for any queries</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoHome}
              className="flex-1 bg-turquoise-blue hover:bg-lime-green hover:text-black text-white py-4 rounded-full font-Inter font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              <FaHome />
              Back to Home
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-white border-2 border-turquoise-blue text-turquoise-blue hover:bg-turquoise-blue hover:text-white py-4 rounded-full font-Inter font-bold text-lg flex items-center justify-center gap-3 transition-all"
            >
              <FaDownload />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
