import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaMotorcycle, FaBolt, FaArrowLeft, FaCaretDown } from 'react-icons/fa';
import { getCustomerMobile, logout } from '../utils/auth';

const BookingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobile = getCustomerMobile() || 'User';
  const initials = mobile.slice(-4).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3 px-4">
          {/* Logo + back */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="text-white/70 hover:text-lime-green transition-colors p-2"
              title="Back to Home"
            >
              <FaArrowLeft />
            </button>
            <Link to="/home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-green to-sunny-yellow rounded-xl flex items-center justify-center text-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                <FaMotorcycle />
              </div>
              <div>
                <h1 className="font-rubik text-lg md:text-xl font-bold text-white leading-none">
                  95BikeRentals<span className="text-lime-green">.in</span>
                </h1>
                <p className="text-[10px] text-gray-300 font-Inter tracking-wider uppercase">Ride Freedom</p>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/booking"
              className="text-white/90 font-Inter font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:text-lime-green transition-all"
            >
              Book a Bike
            </Link>
            <Link
              to="/my-bookings"
              className="text-white/90 font-Inter font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:text-lime-green transition-all"
            >
              My Bookings
            </Link>
            <Link
              to="/home"
              className="text-white/90 font-Inter font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:text-lime-green transition-all"
            >
              Home
            </Link>
          </div>

          {/* Book Now + Profile */}
          <div className="flex items-center gap-3">
            <Link
              to="/booking"
              className="hidden sm:flex group bg-gradient-to-r from-lime-green to-sunny-yellow text-black px-5 py-2 rounded-full font-Inter font-bold text-sm items-center gap-2 hover:shadow-lg hover:shadow-lime-green/30 hover:scale-105 transition-all"
            >
              <FaBolt />
              <span>Book Now</span>
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full pl-1 pr-3 py-1 transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-lime-green to-sunny-yellow rounded-full flex items-center justify-center text-black font-bold text-xs">
                  <FaUser className="text-sm" />
                </div>
                <span className="hidden sm:block text-white font-Inter font-semibold text-sm">{mobile}</span>
                <FaCaretDown className="text-white text-xs" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {initials}
                      </div>
                      <div>
                        <p className="font-Inter font-semibold">Rider Profile</p>
                        <p className="text-sm text-white/80">+91 {mobile}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/booking"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <FaBolt className="text-turquoise-blue" />
                      <span className="font-Inter font-medium">Book a Bike</span>
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <FaMotorcycle className="text-blue-600" />
                      <span className="font-Inter font-medium">My Bookings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                    >
                      <FaSignOutAlt />
                      <span className="font-Inter font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BookingNavbar;
