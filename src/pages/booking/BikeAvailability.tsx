import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import DateTimePicker from '../../components/booking/DateTimePicker';
import BookingNavbar from '../../components/BookingNavbar';
import { calculateRate, getBikeImage, getAvailablePackages } from '../../utils/bikeData';
import { getBikes, checkAvailabilityAll } from '../../services/api';
import { Bike } from '../../types/booking';
import { FaArrowRight, FaCalendarAlt, FaClock, FaBicycle, FaBox } from 'react-icons/fa';

const formatDate = (date: Date | null): string =>
  date ? new Date(date).toISOString().split('T')[0] : '';

const BikeAvailability: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, updateStartDate, updateEndDate, updateStartTime, updateEndTime, selectBike, setBookingDetails } = useBooking();
  const [durationHours, setDurationHours] = useState(0);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loadingBikes, setLoadingBikes] = useState(true);
  const [bikesError, setBikesError] = useState<string | null>(null);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, boolean>>({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookingMode, setBookingMode] = useState<'package' | 'custom'>('package');
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>('10:00 AM');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { startDate, endDate, startTime, endTime } = bookingDetails;

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoadingBikes(true);
        setBikesError(null);
        const data = await getBikes();
        const withImages = data.map((bike) => ({
          ...bike,
          image: getBikeImage(bike.id, bike.image),
        }));
        setBikes(withImages);
      } catch (err) {
        setBikesError(err instanceof Error ? err.message : 'Failed to load bikes');
      } finally {
        setLoadingBikes(false);
      }
    };
    fetchBikes();
  }, []);

  // Compute duration from custom dates
  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      const start = new Date(startDate);
      const [startHour, startMin] = startTime.split(' ')[0].split(':').map(Number);
      const startPeriod = startTime.split(' ')[1];
      start.setHours(startPeriod === 'PM' && startHour !== 12 ? startHour + 12 : startHour === 12 && startPeriod === 'AM' ? 0 : startHour, startMin);

      const end = new Date(endDate);
      const [endHour, endMin] = endTime.split(' ')[0].split(':').map(Number);
      const endPeriod = endTime.split(' ')[1];
      end.setHours(endPeriod === 'PM' && endHour !== 12 ? endHour + 12 : endHour === 12 && endPeriod === 'AM' ? 0 : endHour, endMin);

      const diffMs = end.getTime() - start.getTime();
      const hours = diffMs / (1000 * 60 * 60);
      setDurationHours(Math.max(0, hours));
    }
  }, [startDate, endDate, startTime, endTime]);

  // Package mode: compute end date/time from pickup + package days
  useEffect(() => {
    if (bookingMode === 'package' && selectedPackage && pickupDate) {
      const end = new Date(pickupDate);
      end.setDate(end.getDate() + selectedPackage);
      updateStartDate(pickupDate);
      updateEndDate(end);
      updateStartTime(pickupTime);
      updateEndTime(pickupTime);
      setDurationHours(selectedPackage * 24);
    }
  }, [bookingMode, selectedPackage, pickupDate, pickupTime, updateStartDate, updateEndDate, updateStartTime, updateEndTime]);

  // Check availability whenever we have a valid window (both modes)
  useEffect(() => {
    const hasValidWindow = bookingMode === 'package'
      ? selectedPackage !== null && pickupDate !== null
      : startDate && endDate && durationHours > 0;
    if (!hasValidWindow || !startDate || !endDate || bikes.length === 0) {
      return;
    }

    let cancelled = false;
    const runAvailabilityChecks = async () => {
      setCheckingAvailability(true);
      try {
        const res = await checkAvailabilityAll(
          formatDate(startDate),
          formatDate(endDate),
          startTime,
          endTime
        );
        if (!cancelled) {
          setAvailabilityMap(res.availability);
        }
      } catch {
        if (!cancelled) {
          setAvailabilityMap(Object.fromEntries(bikes.map((bike) => [bike.id, false])));
        }
      } finally {
        if (!cancelled) setCheckingAvailability(false);
      }
    };

    runAvailabilityChecks();
    return () => {
      cancelled = true;
    };
  }, [bikes, startDate, endDate, startTime, endTime, durationHours, bookingMode, selectedPackage, pickupDate]);

  const handleBookNow = (bike: Bike, packageDays: number | null) => {
    const rate = packageDays
      ? (packageDays === 1 ? bike.price1Day : packageDays === 2 ? bike.price2Days : packageDays === 3 ? bike.price3Days : packageDays === 7 ? bike.price7Days : 0) || calculateRate(bike, durationHours)
      : calculateRate(bike, durationHours);
    selectBike(bike);
    setBookingDetails((prev) => ({
      ...prev,
      calculatedRate: rate,
      durationHours: packageDays ? packageDays * 24 : durationHours,
      packageDays,
    }));
    navigate('/booking/summary');
  };

  const isSearchValid = bookingMode === 'package'
    ? selectedPackage !== null && pickupDate !== null
    : bookingDetails.startDate && bookingDetails.endDate && durationHours > 0;

  // Get the set of available package days across all bikes (union)
  const allPackageDays = new Set<number>();
  bikes.forEach((bike) => {
    getAvailablePackages(bike).forEach((p) => allPackageDays.add(p.days));
  });
  const packageOptions: number[] = Array.from(allPackageDays).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BookingNavbar />
      <div className="py-12">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg text-gray-600 font-rubik">
            Choose a package or select custom dates
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setBookingMode('package'); setSelectedPackage(null); setPickupDate(null); }}
            className={`px-8 py-3 rounded-full font-Inter font-semibold flex items-center gap-2 transition-all ${
              bookingMode === 'package'
                ? 'bg-turquoise-blue text-white shadow-lg'
                : 'bg-white text-gray-600 shadow hover:shadow-md'
            }`}
          >
            <FaBox />
            Packages
          </button>
          <button
            onClick={() => { setBookingMode('custom'); setSelectedPackage(null); setPickupDate(null); setBookingDetails((prev) => ({ ...prev, packageDays: null })); }}
            className={`px-8 py-3 rounded-full font-Inter font-semibold flex items-center gap-2 transition-all ${
              bookingMode === 'custom'
                ? 'bg-turquoise-blue text-white shadow-lg'
                : 'bg-white text-gray-600 shadow hover:shadow-md'
            }`}
          >
            <FaCalendarAlt />
            Custom Dates
          </button>
        </div>

        {/* Package selection */}
        {bookingMode === 'package' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <h3 className="text-xl font-rubik font-bold text-gray-800 mb-6 text-center">
              Select a Package
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {packageOptions.map((days) => (
                <button
                  key={days}
                  onClick={() => setSelectedPackage(days)}
                  className={`px-8 py-6 rounded-2xl font-Inter font-semibold transition-all ${
                    selectedPackage === days
                      ? 'bg-gradient-to-r from-turquoise-blue to-sky-blue text-white shadow-xl scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  <div className="text-2xl font-bold">{days} {days === 1 ? 'Day' : 'Days'}</div>
                  <div className="text-sm opacity-80 mt-1">
                    {days === 1 ? '24 hours' : `${days * 24} hours`}
                  </div>
                </button>
              ))}
            </div>
            {selectedPackage && (
              <div className="mt-6 max-w-md mx-auto">
                <DateTimePicker
                  label="Pickup Date & Time"
                  date={pickupDate}
                  onDateChange={setPickupDate}
                  time={pickupTime}
                  onTimeChange={setPickupTime}
                  minDate={today}
                />
                {pickupDate && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-turquoise-blue to-sky-blue rounded-2xl text-white text-center">
                    <p className="font-semibold">
                      {selectedPackage} {selectedPackage === 1 ? 'Day' : 'Days'} package
                    </p>
                    <p className="text-sm opacity-90 mt-1">
                      Pickup: {pickupDate.toLocaleDateString()} at {pickupTime}
                    </p>
                    <p className="text-sm opacity-90">
                      Return: {new Date(new Date(pickupDate).setDate(pickupDate.getDate() + selectedPackage)).toLocaleDateString()} at {pickupTime}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Custom date picker */}
        {bookingMode === 'custom' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DateTimePicker
                label="Start Date & Time"
                date={bookingDetails.startDate}
                onDateChange={updateStartDate}
                time={bookingDetails.startTime}
                onTimeChange={updateStartTime}
                minDate={today}
              />
              <DateTimePicker
                label="End Date & Time"
                date={bookingDetails.endDate}
                onDateChange={updateEndDate}
                time={bookingDetails.endTime}
                onTimeChange={updateEndTime}
                minDate={bookingDetails.startDate || today}
              />
            </div>

            {isSearchValid && (
              <div className="mt-8 p-6 bg-gradient-to-r from-turquoise-blue to-sky-blue rounded-2xl text-white">
                <div className="flex items-center justify-center gap-4">
                  <FaCalendarAlt className="text-2xl" />
                  <div className="text-center">
                    <p className="font-semibold text-lg">Duration: {durationHours.toFixed(1)} hours</p>
                    <p className="text-sm opacity-90">
                      {bookingDetails.startDate?.toLocaleDateString()} {bookingDetails.startTime} - {bookingDetails.endDate?.toLocaleDateString()} {bookingDetails.endTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bike list */}
        {isSearchValid && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FaBicycle className="text-3xl text-turquoise-blue" />
              <h2 className="text-3xl font-merriweather font-bold text-gray-800">
                Available Bikes
              </h2>
            </div>

            {loadingBikes && (
              <div className="text-center py-12 text-gray-600 font-rubik">Loading available bikes...</div>
            )}

            {bikesError && (
              <div className="text-center py-12 text-red-500 font-rubik">{bikesError}</div>
            )}

            {checkingAvailability && (
              <div className="text-center pb-6 text-gray-500 font-rubik">Checking availability for your dates...</div>
            )}

            {!loadingBikes && !bikesError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bikes.map((bike) => {
                const customRate = calculateRate(bike, durationHours);
                const packageRate = selectedPackage
                  ? (selectedPackage === 1 ? bike.price1Day : selectedPackage === 2 ? bike.price2Days : selectedPackage === 3 ? bike.price3Days : selectedPackage === 7 ? bike.price7Days : 0) || 0
                  : 0;
                const displayRate = bookingMode === 'package' && selectedPackage ? packageRate : customRate;
                const isAvailable = availabilityMap[bike.id] !== false;
                const packages = getAvailablePackages(bike);
                return (
                  <div
                    key={bike.id}
                    className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
                      isAvailable ? 'hover:shadow-2xl transform hover:-translate-y-2' : 'opacity-60'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-lime-green px-4 py-2 rounded-full font-Inter font-bold text-black">
                        ₹{displayRate}
                      </div>
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full font-Inter font-semibold text-sm">
                            Booked for selected dates
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-rubik font-bold text-gray-800 mb-3">
                        {bike.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bike.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm font-Inter text-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Package prices for this bike */}
                      {bookingMode === 'package' && packages.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs font-Inter font-semibold text-gray-500 mb-2">PACKAGE PRICES</p>
                          <div className="flex flex-wrap gap-2">
                            {packages.map((pkg) => (
                              <span
                                key={pkg.days}
                                className={`px-3 py-1 rounded-full text-xs font-Inter font-medium ${
                                  selectedPackage === pkg.days
                                    ? 'bg-turquoise-blue text-white'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                              >
                                {pkg.label}: ₹{pkg.price}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock className="text-turquoise-blue" />
                          <span className="font-Inter text-sm">
                            {bookingMode === 'package' && selectedPackage
                              ? `${selectedPackage * 24} hours`
                              : `${durationHours.toFixed(1)} hours`}
                          </span>
                        </div>
                        <button
                          onClick={() => handleBookNow(bike, bookingMode === 'package' ? selectedPackage : null)}
                          disabled={!isAvailable || (bookingMode === 'package' && !selectedPackage)}
                          className="bg-turquoise-blue hover:bg-lime-green hover:text-black text-white px-6 py-3 rounded-full font-Inter font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-turquoise-blue disabled:hover:text-white"
                        >
                          Book Now
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {!isSearchValid && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
              {bookingMode === 'package' ? (
                <>
                  <FaBox className="text-6xl text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-merriweather font-bold text-gray-700 mb-4">
                    Select a Package & Pickup Time
                  </h3>
                  <p className="text-gray-600 font-rubik">
                    Choose a 1, 2, 3, or 7-day package, then pick your pickup date and time. Return is auto-calculated.
                  </p>
                </>
              ) : (
                <>
                  <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-merriweather font-bold text-gray-700 mb-4">
                    Select Your Dates
                  </h3>
                  <p className="text-gray-600 font-rubik">
                    Please select your start and end dates and times to see available bikes.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default BikeAvailability;
