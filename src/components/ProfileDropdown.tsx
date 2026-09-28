import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCaretDown, FaMotorcycle } from 'react-icons/fa';
import { getCustomerMobile, logout } from '../utils/auth';

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobile = getCustomerMobile() || 'User';

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

  const initials = mobile.slice(-4).toUpperCase();

  return (
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
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 transition-all duration-200 opacity-100">
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
            <a
              href="/my-bookings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
            >
              <FaMotorcycle className="text-blue-600" />
              <span className="font-Inter font-medium">My Bookings</span>
            </a>
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
  );
};

export default ProfileDropdown;
