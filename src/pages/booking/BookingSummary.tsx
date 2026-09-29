import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import BookingNavbar from '../../components/BookingNavbar';
import { BookingFormData } from '../../types/booking';
import {
  createBooking,
  uploadIdProof,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getAvailableAccessories,
  calculateRateApi,
  Accessory,
  RateResponse,
} from '../../services/api';
import { FaArrowLeft, FaCheckCircle, FaWhatsapp, FaPhone, FaUpload, FaCreditCard, FaSpinner, FaPlus, FaMinus, FaTag, FaTimes } from 'react-icons/fa';

const formatDate = (date: Date | null): string =>
  date ? new Date(date).toISOString().split('T')[0] : '';

// Razorpay checkout script is loaded lazily on first use.
const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

interface RazorpayWindow extends Window {
  Razorpay?: any;
}
declare const window: RazorpayWindow;

const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails, setBookingReference } = useBooking();
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    idProof: '',
    idProofFile: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [idProofUrl, setIdProofUrl] = useState<string | null>(null);

  // Accessories + coupon state
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, number>>({});
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [rateData, setRateData] = useState<RateResponse | null>(null);
  const [rateLoading, setRateLoading] = useState(false);

  // Fetch accessories on mount
  useEffect(() => {
    getAvailableAccessories()
      .then(setAccessories)
      .catch(() => {});
  }, []);

  // Build accessories array for API calls (memoized to keep effect deps stable)
  const accessoriesPayload = useMemo(
    () =>
      Object.entries(selectedAccessories)
        .filter(([, qty]) => qty > 0)
        .map(([accessoryId, quantity]) => ({ accessoryId, quantity })),
    [selectedAccessories]
  );

  // Fetch rate whenever accessories or coupon changes
  const fetchRate = useCallback(async () => {
    if (!bookingDetails.selectedBike || !bookingDetails.startDate || !bookingDetails.endDate) return;
    setRateLoading(true);
    try {
      const data = await calculateRateApi(
        bookingDetails.selectedBike.id,
        formatDate(bookingDetails.startDate),
        formatDate(bookingDetails.endDate),
        bookingDetails.startTime,
        bookingDetails.endTime,
        accessoriesPayload,
        appliedCoupon || undefined,
        bookingDetails.packageDays
      );
      setRateData(data);
    } catch {
      // ignore rate fetch errors
    } finally {
      setRateLoading(false);
    }
  }, [bookingDetails.selectedBike, bookingDetails.startDate, bookingDetails.endDate, bookingDetails.startTime, bookingDetails.endTime, bookingDetails.packageDays, accessoriesPayload, appliedCoupon]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  if (!bookingDetails.selectedBike) {
    return <Navigate to="/booking" replace />;
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    const phone = formData.customerPhone.replace(/[\s-]/g, '');
    if (!phone) newErrors.customerPhone = 'Phone is required';
    else if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(phone)) newErrors.customerPhone = 'Enter a valid 10-digit mobile number';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.customerEmail.trim())) newErrors.customerEmail = 'Enter a valid email address';
    if (!formData.customerAddress.trim()) newErrors.customerAddress = 'Address is required';
    if (!formData.idProof.trim()) newErrors.idProof = 'ID Proof is required';
    if (!formData.idProofFile) newErrors.idProofFile = 'ID Proof file is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, idProofFile: file });
      setUploading(true);
      setSubmitError(null);
      try {
        const { key } = await uploadIdProof(file);
        setIdProofUrl(key);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to upload ID proof');
        setIdProofUrl(null);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAccessoryQty = (id: string, delta: number) => {
    setSelectedAccessories((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponError(null);
    setAppliedCoupon(couponCode.trim().toUpperCase());
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !idProofUrl) {
      if (!idProofUrl) setSubmitError('Please upload your ID proof file first');
      return;
    }
    if (!bookingDetails.selectedBike) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await createBooking({
        bikeId: bookingDetails.selectedBike.id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerAddress: formData.customerAddress,
        idProof: formData.idProof,
        idProofFilePath: idProofUrl,
        startDate: formatDate(bookingDetails.startDate),
        endDate: formatDate(bookingDetails.endDate),
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
        paymentMethod: 'whatsapp',
        accessories: accessoriesPayload,
        couponCode: appliedCoupon || undefined,
        packageDays: bookingDetails.packageDays,
      });
      setBookingReference(response.id);
      setBookingDetails((prev) => ({
        ...prev,
        calculatedRate: response.calculatedRate,
        securityDeposit: response.securityDeposit,
        finalTotal: response.calculatedRate + response.securityDeposit,
        bookingStatus: response.status,
        paymentStatus: 'whatsapp',
      }));

      const message = `Hello, I would like to confirm my booking.\n\nBooking ID: ${response.id}\nBike: ${bookingDetails.selectedBike.name}\nStart: ${bookingDetails.startDate?.toLocaleDateString()} ${bookingDetails.startTime}\nEnd: ${bookingDetails.endDate?.toLocaleDateString()} ${bookingDetails.endTime}\nDuration: ${response.durationHours} hours\nTotal: ₹${response.calculatedRate}\nSecurity Deposit: ₹${response.securityDeposit}\n\nCustomer Details:\nName: ${formData.customerName}\nPhone: ${formData.customerPhone}\nEmail: ${formData.customerEmail}\nAddress: ${formData.customerAddress}\nID Proof: ${formData.idProof}`;
      const whatsappUrl = `https://wa.me/917410192695?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      navigate('/booking/success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!validateForm() || !idProofUrl) {
      if (!idProofUrl) setSubmitError('Please upload your ID proof file first');
      return;
    }
    if (!bookingDetails.selectedBike) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await createBooking({
        bikeId: bookingDetails.selectedBike.id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerAddress: formData.customerAddress,
        idProof: formData.idProof,
        idProofFilePath: idProofUrl,
        startDate: formatDate(bookingDetails.startDate),
        endDate: formatDate(bookingDetails.endDate),
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
        paymentMethod: 'razorpay',
        accessories: accessoriesPayload,
        couponCode: appliedCoupon || undefined,
        packageDays: bookingDetails.packageDays,
      });
      setBookingReference(booking.id);
      setBookingDetails((prev) => ({
        ...prev,
        calculatedRate: booking.calculatedRate,
        securityDeposit: booking.securityDeposit,
        finalTotal: booking.calculatedRate + booking.securityDeposit,
        bookingStatus: booking.status,
        paymentStatus: 'pending',
      }));

      const order = await createRazorpayOrder(booking.id);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        setSubmitError('Failed to load payment gateway. Please try again.');
        setSubmitting(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: '95BikeRentals',
        description: `Booking for ${bookingDetails.selectedBike.name}`,
        order_id: order.orderId,
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.customerPhone,
        },
        theme: { color: '#22c55e' },
        handler: async (response: any) => {
          try {
            await verifyRazorpayPayment(
              booking.id,
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
            setBookingDetails((prev) => ({
              ...prev,
              bookingStatus: 'confirmed',
              paymentStatus: 'paid',
            }));
            navigate('/booking/success');
          } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Payment verification failed');
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setSubmitError('Payment cancelled. You can retry from My Bookings.');
          },
        },
      });

      rzp.on('payment.failed', (resp: any) => {
        setSubmitError(resp?.error?.description || 'Payment failed');
        setSubmitting(false);
      });

      rzp.open();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/booking');
  };

  const displayTotal =
    (rateData?.calculatedRate ?? bookingDetails.calculatedRate) +
    (rateData?.securityDeposit ?? bookingDetails.securityDeposit);
  const breakdown = rateData?.breakdown;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BookingNavbar />
      <div className="py-12">
      <div className="max-w-6xl px-4 mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-turquoise-blue transition-colors font-Inter font-semibold"
        >
          <FaArrowLeft />
          Back to Availability
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
            Booking Summary
          </h1>
          <p className="text-lg text-gray-600 font-rubik">
            Review your booking details and complete your reservation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Bike + Accessories + Price breakdown */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-merriweather font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaCheckCircle className="text-turquoise-blue" />
                Bike Details
              </h2>

              <div className="mb-6">
                <img
                  src={bookingDetails.selectedBike.image}
                  alt={bookingDetails.selectedBike.name}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-rubik font-bold text-gray-800">
                    {bookingDetails.selectedBike.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
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

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-Inter">Duration</span>
                    <span className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.durationHours.toFixed(1)} hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-Inter">Start Date & Time</span>
                    <span className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.startDate?.toLocaleDateString()} {bookingDetails.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-Inter">End Date & Time</span>
                    <span className="font-semibold font-Inter text-gray-800">
                      {bookingDetails.endDate?.toLocaleDateString()} {bookingDetails.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessories section */}
            {accessories.length > 0 && (
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-merriweather font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-turquoise-blue" />
                  Add Accessories
                </h2>
                <div className="space-y-3">
                  {accessories.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-Inter font-semibold text-gray-800">{acc.name}</p>
                        <p className="text-sm text-gray-500 font-Inter">
                          {acc.description || 'Add-on'} · ₹{acc.pricePerDay}/day
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAccessoryQty(acc.id, -1)}
                          disabled={!selectedAccessories[acc.id]}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-8 text-center font-Inter font-semibold text-gray-800">
                          {selectedAccessories[acc.id] || 0}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAccessoryQty(acc.id, 1)}
                          className="w-8 h-8 rounded-full bg-turquoise-blue text-white flex items-center justify-center hover:bg-lime-green hover:text-black transition-all"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price breakdown */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-merriweather font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaCheckCircle className="text-turquoise-blue" />
                Price Breakdown
              </h2>

              {/* Coupon input */}
              <div className="mb-6">
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  <FaTag className="inline mr-1" /> Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center gap-2">
                    <span className="flex-1 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-Inter font-semibold">
                      ✓ {appliedCoupon} applied
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-turquoise-blue font-Inter"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-6 py-3 bg-turquoise-blue text-white rounded-xl font-Inter font-semibold hover:bg-lime-green hover:text-black transition-all disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{couponError}</p>
                )}
              </div>

              {/* Line items */}
              <div className="space-y-3">
                {breakdown && (
                  <>
                    <div className="flex justify-between text-gray-600 font-Inter">
                      <span>Rental ({rateData?.durationHours ?? bookingDetails.durationHours.toFixed(0)}h)</span>
                      <span>₹{breakdown.rentalTotal}</span>
                    </div>
                    {breakdown.accessoriesTotal > 0 && (
                      <div className="flex justify-between text-gray-600 font-Inter">
                        <span>Accessories</span>
                        <span>₹{breakdown.accessoriesTotal}</span>
                      </div>
                    )}
                    {breakdown.discountAmount > 0 && (
                      <div className="flex justify-between text-green-600 font-Inter">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{breakdown.discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600 font-Inter">
                      <span>GST ({breakdown.gstRate}%)</span>
                      <span>₹{breakdown.gstAmount}</span>
                    </div>
                  </>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-600 font-Inter">
                  <span>Security Deposit (refundable)</span>
                  <span>₹{rateData?.securityDeposit ?? bookingDetails.securityDeposit}</span>
                </div>
                <div className="bg-gradient-to-r from-lime-green to-sunny-yellow rounded-2xl p-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold font-Inter text-gray-800">Total Payable</span>
                    <span className="text-3xl font-bold font-Inter text-gray-800">
                      {rateLoading ? <FaSpinner className="animate-spin inline text-xl" /> : `₹${displayTotal}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Customer details form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-merriweather font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaCheckCircle className="text-turquoise-blue" />
              Customer Details
            </h2>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-Inter transition-all ${
                    errors.customerName ? 'border-red-500' : 'border-gray-200 focus:border-turquoise-blue'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-Inter transition-all ${
                    errors.customerPhone ? 'border-red-500' : 'border-gray-200 focus:border-turquoise-blue'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-Inter transition-all ${
                    errors.customerEmail ? 'border-red-500' : 'border-gray-200 focus:border-turquoise-blue'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.customerEmail}</p>
                )}
              </div>

              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-Inter transition-all ${
                    errors.customerAddress ? 'border-red-500' : 'border-gray-200 focus:border-turquoise-blue'
                  }`}
                  placeholder="Enter your address"
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.customerAddress}</p>
                )}
              </div>

              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  ID Proof (Aadhar/PAN/Driving License) *
                </label>
                <input
                  type="text"
                  value={formData.idProof}
                  onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-Inter transition-all ${
                    errors.idProof ? 'border-red-500' : 'border-gray-200 focus:border-turquoise-blue'
                  }`}
                  placeholder="Enter your ID proof number"
                />
                {errors.idProof && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.idProof}</p>
                )}
              </div>

              <div>
                <label className="block font-Inter font-semibold text-gray-700 mb-2">
                  Upload ID Card *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="idProofFile"
                  />
                  <label
                    htmlFor="idProofFile"
                    className={`w-full px-4 py-3 border-2 rounded-xl flex items-center justify-center gap-3 cursor-pointer font-Inter transition-all ${
                      errors.idProofFile ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-turquoise-blue bg-gray-50'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="animate-spin text-gray-500" />
                        <span className="text-gray-600">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="text-gray-500" />
                        <span className="text-gray-600">
                          {idProofUrl
                            ? '✓ ID proof uploaded'
                            : formData.idProofFile
                            ? formData.idProofFile.name
                            : 'Click to upload ID card (Image/PDF)'}
                        </span>
                      </>
                    )}
                  </label>
                </div>
                {errors.idProofFile && (
                  <p className="text-red-500 text-sm mt-1 font-Inter">{errors.idProofFile}</p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full bg-turquoise-blue hover:bg-lime-green hover:text-black text-white py-4 rounded-full font-Inter font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaWhatsapp />
                  {submitting ? 'Creating Booking...' : 'Book via WhatsApp'}
                </button>

                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={submitting || uploading}
                  className="w-full bg-gradient-to-r from-orange to-hot-pink hover:from-coral hover:to-hot-pink text-white py-4 rounded-full font-Inter font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaCreditCard />
                  {submitting ? 'Processing...' : `Pay ₹${displayTotal} with Razorpay`}
                </button>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm text-center font-Inter">{submitError}</p>
              )}

              <div className="flex items-center justify-center gap-4 pt-4">
                <a
                  href="tel:+917410192695"
                  className="flex items-center gap-2 text-coral font-Inter font-semibold hover:underline"
                >
                  <FaPhone />
                  Call Us
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingSummary;
