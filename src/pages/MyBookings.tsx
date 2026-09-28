import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingNavbar from '../components/BookingNavbar';
import {
  FaArrowLeft,
  FaBicycle,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaTimesCircle,
  FaCheckCircle,
  FaHourglass,
  FaSpinner,
} from 'react-icons/fa';
import { getMyBookings, cancelBooking, MyBooking } from '../services/api';

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FaHourglass />, label: 'Pending' },
  confirmed: { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle />, label: 'Confirmed' },
  cancelled: { color: 'bg-red-100 text-red-800', icon: <FaTimesCircle />, label: 'Cancelled' },
  completed: { color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle />, label: 'Completed' },
};

const paymentConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-yellow-50 text-yellow-700', label: 'Payment Pending' },
  paid: { color: 'bg-green-50 text-green-700', label: 'Paid' },
  failed: { color: 'bg-red-50 text-red-700', label: 'Payment Failed' },
  refunded: { color: 'bg-purple-50 text-purple-700', label: 'Refunded' },
  cash: { color: 'bg-blue-50 text-blue-700', label: 'Cash on Pickup' },
  whatsapp: { color: 'bg-emerald-50 text-emerald-700', label: 'WhatsApp Booking' },
};

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancellingId(id);
    try {
      await cancelBooking(id);
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const handleBack = () => navigate('/home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BookingNavbar />
      <div className="py-12">
      <div className="max-w-5xl px-4 mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-turquoise-blue transition-colors font-Inter font-semibold"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 font-rubik">
            View and manage your rental bookings
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-turquoise-blue" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-Inter">{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-4 px-6 py-2 bg-turquoise-blue text-white rounded-full font-Inter font-semibold hover:bg-lime-green hover:text-black transition-all"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <FaBicycle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-merriweather font-bold text-gray-800 mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-600 font-Inter mb-6">
              You haven't made any bookings yet. Start your journey today!
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="px-8 py-3 bg-turquoise-blue text-white rounded-full font-Inter font-bold hover:bg-lime-green hover:text-black transition-all shadow-lg"
            >
              Book a Bike
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const status = statusConfig[booking.status] || statusConfig.pending;
              const payment = paymentConfig[booking.paymentStatus] || paymentConfig.pending;
              const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

              return (
                <div key={booking.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Bike image */}
                    <div className="md:col-span-1 h-48 md:h-auto">
                      <img
                        src={booking.bike?.image || '/images/placeholder.jpg'}
                        alt={booking.bike?.name || 'Bike'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-rubik font-bold text-gray-800">
                            {booking.bike?.name || 'Unknown Bike'}
                          </h3>
                          <p className="text-sm text-gray-500 font-Inter">
                            Booking #{booking.id.split('-')[0].toUpperCase()}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <span className={`px-3 py-1 rounded-full text-sm font-Inter font-semibold flex items-center gap-1 ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-Inter font-medium ${payment.color}`}>
                            {payment.label}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <FaCalendarAlt className="text-turquoise-blue mt-1" />
                          <div>
                            <p className="text-xs text-gray-500 font-Inter">Start</p>
                            <p className="text-sm font-semibold font-Inter text-gray-800">
                              {new Date(booking.startDate).toLocaleDateString()} {booking.startTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FaCalendarAlt className="text-turquoise-blue mt-1" />
                          <div>
                            <p className="text-xs text-gray-500 font-Inter">End</p>
                            <p className="text-sm font-semibold font-Inter text-gray-800">
                              {new Date(booking.endDate).toLocaleDateString()} {booking.endTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FaClock className="text-turquoise-blue mt-1" />
                          <div>
                            <p className="text-xs text-gray-500 font-Inter">Duration</p>
                            <p className="text-sm font-semibold font-Inter text-gray-800">
                              {booking.durationHours} hours
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FaRupeeSign className="text-turquoise-blue mt-1" />
                          <div>
                            <p className="text-xs text-gray-500 font-Inter">Total</p>
                            <p className="text-sm font-semibold font-Inter text-gray-800">
                              ₹{booking.calculatedRate}
                              <span className="text-xs text-gray-500"> + ₹{booking.securityDeposit} deposit</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {canCancel && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="px-5 py-2 bg-red-50 text-red-600 border border-red-200 rounded-full font-Inter font-semibold text-sm hover:bg-red-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {cancellingId === booking.id ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <FaTimesCircle />
                              Cancel Booking
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyBookings;
