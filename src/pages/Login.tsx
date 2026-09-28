import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMotorcycle,
  FaPhone,
  FaHashtag,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, initializeRecaptchaConfig } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { verifyCustomerToken } from '../services/api';

const DEV_FIREBASE_TOKEN = 'dev-firebase-token';
const DEV_OTP = '123456';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('customerToken')) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devNote, setDevNote] = useState('');
  const confirmationResult = useRef<ConfirmationResult | null>(null);

  const formatMobile = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.startsWith('91') ? digits.slice(2) : digits;
  };

  const setupRecaptcha = () => {
    if (!auth) return;
    const container = document.getElementById('recaptcha-container');
    if (!container) return;
    container.innerHTML = '';
    // Tell Firebase to use reCAPTCHA Enterprise (configured in Firebase Console)
    try {
      initializeRecaptchaConfig(auth);
    } catch (e) {
      // Already initialized — safe to ignore
    }
    // Disable app verification for testing (works with Firebase test phone numbers)
    // This bypasses reCAPTCHA when using phone numbers registered as test numbers
    // Only enabled in development — must be disabled for production with real reCAPTCHA
    if (process.env.NODE_ENV === 'development') {
      (auth as any).settings = (auth as any).settings || {};
      (auth as any).settings.appVerificationDisabledForTesting = true;
    }
    const verifier = new RecaptchaVerifier(auth, container, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {
        setError('reCAPTCHA expired. Please try again.');
      },
    });
    return verifier;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDevNote('');
    try {
      const formattedMobile = formatMobile(mobile);
      if (formattedMobile.length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }

      if (!isFirebaseConfigured()) {
        setOtpSent(true);
        setDevNote('Development mode: use OTP 123456');
        return;
      }

      const verifier = setupRecaptcha();
      if (!verifier || !auth) {
        throw new Error('Firebase authentication is not initialized');
      }

      const phoneNumber = `+91${formattedMobile}`;
      confirmationResult.current = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setOtpSent(true);
    } catch (err: any) {
      console.error('Firebase OTP error:', err);
      const errMsg = err?.code
        ? `${err.code}: ${err.message}`
        : (err?.message || 'Failed to send OTP');
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formattedMobile = formatMobile(mobile);
      let idToken = DEV_FIREBASE_TOKEN;

      if (isFirebaseConfigured()) {
        if (!confirmationResult.current) {
          throw new Error('OTP session expired. Please resend OTP.');
        }
        const result = await confirmationResult.current.confirm(otp);
        idToken = await result.user.getIdToken();
      } else {
        if (otp !== DEV_OTP) {
          throw new Error('Invalid OTP');
        }
      }

      const res = await verifyCustomerToken(idToken, formattedMobile);
      localStorage.setItem('customerToken', res.token);
      localStorage.setItem('customerMobile', res.user.mobile);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp('');
    setError('');
    setDevNote('');
    confirmationResult.current = null;
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSendOTP(fakeEvent);
    if (!error) {
      setDevNote('OTP resent');
    }
  };

  const features = [
    { icon: <FaShieldAlt />, text: 'Verified & Safe Rides' },
    { icon: <FaClock />, text: '24/7 Support' },
    { icon: <FaStar />, text: '4.9 Customer Rating' },
  ];

  return (
    <div className="bg-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-black/60" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Brand Section */}
          <div className="text-white space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-lime-green to-sunny-yellow rounded-2xl flex items-center justify-center text-black text-3xl shadow-lg">
                <FaMotorcycle />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-rubik font-bold">95BikeRentals</h1>
                <p className="text-lime-green font-Inter font-semibold">.in</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-merriweather font-extrabold leading-tight">
                Premium Bike
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-green to-sunny-yellow">
                  Rentals in Nashik
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-200 font-rubik max-w-xl mx-auto lg:mx-0">
                Rent top-quality bikes & scooters in minutes. Explore Nashik with freedom, safety, and unbeatable prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full"
                >
                  <span className="text-lime-green">{feature.icon}</span>
                  <span className="text-sm font-Inter font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white font-merriweather mb-2">
                  {!otpSent ? 'Login to Ride' : 'Verify OTP'}
                </h3>
                <p className="text-gray-300 text-sm font-Inter">
                  {!otpSent ? 'Enter your mobile number to get started' : `We sent a code to +91 ${mobile}`}
                </p>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2 font-Inter">Mobile Number</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-Inter font-medium">
                        <FaPhone />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full pl-20 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-lime-green focus:border-lime-green outline-none transition-all font-Inter"
                        placeholder="9999999999"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl text-sm font-Inter">
                      <span>⚠</span>
                      {error}
                    </div>
                  )}

                  {devNote && (
                    <div className="flex items-center gap-2 text-green-300 bg-green-500/10 border border-green-500/20 px-4 py-2.5 rounded-xl text-sm font-Inter">
                      <FaCheckCircle />
                      {devNote}
                    </div>
                  )}

                  <div id="recaptcha-container" />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-lime-green to-sunny-yellow text-black font-Inter font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2 font-Inter">Enter OTP</label>
                    <div className="relative">
                      <FaHashtag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-lime-green focus:border-lime-green outline-none transition-all font-Inter text-center tracking-[0.5em] text-lg"
                        placeholder="123456"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl text-sm font-Inter">
                      <span>⚠</span>
                      {error}
                    </div>
                  )}

                  {devNote && (
                    <div className="flex items-center gap-2 text-green-300 bg-green-500/10 border border-green-500/20 px-4 py-2.5 rounded-xl text-sm font-Inter">
                      <FaCheckCircle />
                      {devNote}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-lime-green to-sunny-yellow text-black font-Inter font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <span>Verify & Login</span>
                    )}
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      className="flex-1 py-2.5 text-sm text-lime-green hover:text-white border border-lime-green/50 hover:bg-lime-green/20 rounded-xl transition-all disabled:opacity-60 font-Inter font-medium"
                    >
                      Resend OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setError('');
                        setDevNote('');
                        confirmationResult.current = null;
                      }}
                      className="flex-1 py-2.5 text-sm text-white/70 hover:text-white border border-white/20 hover:bg-white/10 rounded-xl transition-all font-Inter font-medium"
                    >
                      Change Number
                    </button>
                  </div>
                </form>
              )}

              <p className="text-center text-white/50 text-xs mt-6 font-Inter">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
