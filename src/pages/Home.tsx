import React, { useState, useEffect } from "react";
import Cities from "../components/Cities";
import Bikes from "../components/Bikes";
import ProfileDropdown from "../components/ProfileDropdown";
import { getCustomerMobile } from "../utils/auth";
import { FaArrowRight, FaMotorcycle, FaMapMarkedAlt, FaShieldAlt, FaHeadset, FaWhatsapp, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaUsers, FaClock, FaRupeeSign, FaSearchLocation, FaCalendarCheck, FaKey, FaChevronDown, FaPlayCircle, FaCheckCircle, FaBolt } from "react-icons/fa";
import Contact from "../components/Contact";
import Iternary from "../assets/images/iternary.jpeg";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const downloadIternary = () => {
    const link = document.createElement("a");
    link.href = "/iternary.pdf";
    link.download = "iternary.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <div className="bg-hero">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-lime-green/30 rounded-full blur-3xl animate-gradient-orb" />
          <div className="absolute top-1/3 -right-40 w-80 h-80 bg-turquoise-blue/30 rounded-full blur-3xl animate-gradient-orb" style={{ animationDelay: '-7s' }} />
          <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-gradient-orb" style={{ animationDelay: '-14s' }} />
        </div>

        <div className="hero-content max-w-7xl px-4 mx-auto min-h-screen flex flex-col">
          {/* Navbar */}
          <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'top-0' : ''
          }`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className={`flex justify-between items-center transition-all duration-500 ${
                scrolled
                  ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 py-3 px-6 rounded-none shadow-2xl'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 py-3 px-6 rounded-2xl shadow-lg'
              }`}>
                <a href="/home" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-green to-sunny-yellow rounded-xl flex items-center justify-center text-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <FaMotorcycle />
                  </div>
                  <div>
                    <h1 className="font-rubik text-lg md:text-xl font-bold text-white leading-none">
                      95BikeRentals<span className="text-lime-green">.in</span>
                    </h1>
                    <p className="text-[10px] text-gray-300 font-Inter tracking-wider uppercase">Ride Freedom</p>
                  </div>
                </a>

                <div className="hidden lg:flex items-center gap-2">
                  {[
                    { label: 'Cities', href: '#cities' },
                    { label: 'Why Us', href: '#why-choose-us' },
                    { label: 'Our Fleet', href: '#our-fleet' },
                    { label: 'How It Works', href: '#how-it-works' },
                    { label: 'Itinerary', href: '#itinerary' },
                    { label: 'Contact', href: '#contact-us' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-white/90 font-Inter font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:text-lime-green transition-all scroll-smooth"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                  <a
                    href="/booking"
                    className="group bg-gradient-to-r from-lime-green to-sunny-yellow text-black px-6 py-2.5 rounded-full font-Inter font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-lime-green/30 hover:scale-105 transition-all"
                  >
                    <FaBolt />
                    <span>Book Now</span>
                  </a>
                  <ProfileDropdown />
                </div>

                <button
                  id="menu-btn"
                  onClick={toggleMenu}
                  className={`lg:hidden block ${
                    showMenu ? "open" : ""
                  } hamburger focus:outline-none`}
                >
                  <span className="hamburger-top bg-white"></span>
                  <span className="hamburger-middle bg-white"></span>
                  <span className="hamburger-bottom bg-white"></span>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu overlay */}
          <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
            showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setShowMenu(false)} />
            <div className={`absolute top-24 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-6 transition-all duration-500 ${
              showMenu ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              <a href="#cities" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Cities</a>
              <a href="#why-choose-us" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Why Us</a>
              <a href="#our-fleet" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Our Fleet</a>
              <a href="#how-it-works" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">How It Works</a>
              <a href="#itinerary" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Itinerary</a>
              <a href="#contact-us" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Contact</a>
              <a href="/booking" onClick={() => setShowMenu(false)} className="bg-gradient-to-r from-lime-green to-sunny-yellow text-black px-8 py-3 rounded-full font-Inter font-bold flex items-center gap-2">
                <FaBolt /> Book Now
              </a>
              <a href="/home" onClick={() => setShowMenu(false)} className="text-white text-lg font-Inter font-semibold hover:text-lime-green transition-all">Profile</a>
              <button
                onClick={() => {
                  localStorage.removeItem('customerToken');
                  localStorage.removeItem('customerMobile');
                  window.location.href = '/';
                }}
                className="text-red-400 text-lg font-Inter font-semibold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex items-center pt-28 pb-12">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left content */}
              <div className="lg:col-span-7 text-white space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-green/20 to-sunny-yellow/20 backdrop-blur-sm border border-lime-green/30 px-4 py-2 rounded-full font-Inter font-semibold text-sm">
                  <span className="w-2 h-2 bg-lime-green rounded-full animate-pulse" />
                  <span className="text-lime-green">Welcome back</span>
                  <span className="text-white/70">+91 {getCustomerMobile()}</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-Inter font-semibold text-lime-green tracking-wide">
                    Premium Bike Rentals in Nashik
                  </h2>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-merriweather font-bold leading-tight">
                    Your Journey,
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-green via-sunny-yellow to-lime-green">
                      Our Passion
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl font-rubik text-gray-200 max-w-xl leading-relaxed">
                  Experience the freedom of the open road. From daily scooters to premium bikes, rent your perfect ride and explore Nashik on your terms.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <FaStar className="text-sunny-yellow" />, text: '4.9 Rated' },
                    { icon: <FaUsers className="text-turquoise-blue" />, text: '5000+ Riders' },
                    { icon: <FaShieldAlt className="text-lime-green" />, text: 'Insured Rides' },
                    { icon: <FaClock className="text-coral" />, text: '24/7 Support' },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-Inter font-semibold text-white"
                    >
                      {badge.icon}
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    className="group bg-gradient-to-r from-lime-green to-sunny-yellow text-black py-4 px-8 rounded-full font-Inter font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-lime-green/30 hover:scale-105 transition-all duration-300"
                    href="/booking"
                  >
                    <FaBolt />
                    <span>Start Your Adventure</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    className="group bg-white/10 backdrop-blur-md text-white py-4 px-8 rounded-full font-Inter font-semibold text-lg flex items-center gap-3 hover:bg-white/20 transition-all border border-white/30 hover:border-lime-green/50"
                    href="#our-fleet"
                  >
                    <FaPlayCircle className="group-hover:scale-110 transition-transform" />
                    <span>Explore Fleet</span>
                  </a>
                </div>
              </div>

              {/* Right floating cards */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <div className="relative">
                  {/* Main floating card */}
                  <div className="animate-float bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-lime-green to-sunny-yellow rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <FaMotorcycle className="text-4xl text-black" />
                    </div>
                    <h3 className="text-3xl font-merriweather font-bold text-white mb-2">
                      Ready to Ride?
                    </h3>
                    <p className="text-gray-200 font-rubik mb-6">
                      Premium bikes starting at just ₹425/day. Book now and hit the road.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold font-Inter text-lime-green">50+</p>
                        <p className="text-xs text-gray-300 font-Inter">Bikes</p>
                      </div>
                      <div className="w-px h-10 bg-white/20" />
                      <div className="text-center">
                        <p className="text-3xl font-bold font-Inter text-sunny-yellow">4.9</p>
                        <p className="text-xs text-gray-300 font-Inter">Rating</p>
                      </div>
                      <div className="w-px h-10 bg-white/20" />
                      <div className="text-center">
                        <p className="text-3xl font-bold font-Inter text-turquoise-blue">24/7</p>
                        <p className="text-xs text-gray-300 font-Inter">Support</p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary floating cards */}
                  <div className="absolute -bottom-8 -left-8 animate-float-delayed bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-lime-green rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-black" />
                      </div>
                      <div>
                        <p className="font-Inter font-bold text-gray-800 text-sm">Instant Booking</p>
                        <p className="text-xs text-gray-500 font-Inter">Confirmed in 2 mins</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 animate-pulse-glow bg-gradient-to-r from-coral to-orange rounded-2xl p-4 shadow-xl text-white">
                    <p className="font-Inter font-bold text-sm flex items-center gap-2">
                      <FaBolt /> Starting ₹425
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards - visible on all screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-lime-green/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-lime-green/30 transition-colors">
                <FaMotorcycle className="text-2xl text-lime-green" />
              </div>
              <h3 className="text-white font-merriweather font-bold text-lg mb-1">Premium Fleet</h3>
              <p className="text-gray-300 font-rubik text-sm">Top-quality bikes maintained to perfection</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-turquoise-blue/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-turquoise-blue/30 transition-colors">
                <FaMapMarkedAlt className="text-2xl text-turquoise-blue" />
              </div>
              <h3 className="text-white font-merriweather font-bold text-lg mb-1">Easy Booking</h3>
              <p className="text-gray-300 font-rubik text-sm">Book online in minutes, ride instantly</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-coral/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-coral/30 transition-colors">
                <FaShieldAlt className="text-2xl text-coral" />
              </div>
              <h3 className="text-white font-merriweather font-bold text-lg mb-1">Safe & Secure</h3>
              <p className="text-gray-300 font-rubik text-sm">Helmets included, insurance covered</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-sunny-yellow/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-sunny-yellow/30 transition-colors">
                <FaHeadset className="text-2xl text-sunny-yellow" />
              </div>
              <h3 className="text-white font-merriweather font-bold text-lg mb-1">24/7 Support</h3>
              <p className="text-gray-300 font-rubik text-sm">Always here to help you on your journey</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-8">
            <a href="#why-choose-us" className="flex flex-col items-center gap-2 text-white/60 hover:text-lime-green transition-all animate-scroll-bounce">
              <span className="text-xs font-Inter font-semibold tracking-wider uppercase">Scroll to explore</span>
              <FaChevronDown className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      
      <div id="why-choose-us" className="py-20 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-lime-green/20 text-lime-700 px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
              Why 95BikeRentals
            </span>
            <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 font-rubik max-w-2xl mx-auto">
              We're committed to providing the best bike rental experience in Nashik with quality service and unbeatable prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: <FaUsers className="text-3xl text-white" />, value: '5000+', label: 'Happy Customers', color: 'from-turquoise-blue to-sky-blue', bg: 'from-turquoise-blue/10 to-sky-blue/10' },
              { icon: <FaMotorcycle className="text-3xl text-white" />, value: '50+', label: 'Premium Bikes', color: 'from-lime-green to-sunny-yellow', bg: 'from-lime-green/10 to-sunny-yellow/10' },
              { icon: <FaStar className="text-3xl text-white" />, value: '4.9', label: 'Customer Rating', color: 'from-coral to-orange', bg: 'from-coral/10 to-orange/10' },
              { icon: <FaClock className="text-3xl text-white" />, value: '24/7', label: 'Support', color: 'from-hot-pink to-purple', bg: 'from-hot-pink/10 to-purple/10' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`group text-center p-8 bg-gradient-to-br ${stat.bg} rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold font-Inter text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-rubik">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-2xl text-white" />,
                title: 'Well-Maintained Fleet',
                desc: 'All our bikes are regularly serviced and maintained to ensure a safe and smooth ride every time.',
                color: 'bg-turquoise-blue',
              },
              {
                icon: <FaRupeeSign className="text-2xl text-white" />,
                title: 'Affordable Pricing',
                desc: 'Competitive rates with no hidden charges. Choose from hourly, daily, or weekly rental packages.',
                color: 'bg-lime-green',
              },
              {
                icon: <FaHeadset className="text-2xl text-white" />,
                title: 'Excellent Support',
                desc: 'Our dedicated team is available round the clock to assist you with any queries or roadside assistance.',
                color: 'bg-coral',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-merriweather font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-rubik leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="cities">
        <Cities />
      </div>

      <div id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-coral/10 text-coral px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 font-rubik max-w-2xl mx-auto">
              Renting a bike in Nashik is now just 3 simple steps away
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearchLocation className="text-4xl text-turquoise-blue" />,
                step: '01',
                title: 'Choose Your Bike',
                desc: 'Browse our fleet and pick the perfect ride for your journey.',
              },
              {
                icon: <FaCalendarCheck className="text-4xl text-lime-green" />,
                step: '02',
                title: 'Book Online',
                desc: 'Select your dates, confirm availability, and book in minutes.',
              },
              {
                icon: <FaKey className="text-4xl text-coral" />,
                step: '03',
                title: 'Ride & Enjoy',
                desc: 'Pick up your bike and explore Nashik with complete freedom.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="absolute top-6 right-6 text-6xl font-merriweather font-bold text-gray-200/50 group-hover:text-lime-green/20 transition-colors">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-merriweather font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-rubik leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="our-fleet">
        <Bikes />
      </div>
      <div id="itinerary" className="py-20 bg-gradient-to-br from-turquoise-blue/10 to-sky-blue/10">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-turquoise-blue/20 text-turquoise-blue px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
              Travel Guide
            </span>
            <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
              Plan Your Perfect Ride
            </h2>
            <p className="text-lg text-gray-600 font-rubik max-w-2xl mx-auto">
              Download our detailed itinerary guide to discover the best routes, scenic spots, and bike-friendly locations across Nashik.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-4">
                <img src={Iternary} alt="Itinerary" className="w-full h-auto rounded-2xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-lime-green rounded-full flex items-center justify-center shadow-xl">
                <FaMapMarkedAlt className="text-4xl text-white" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-turquoise-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkedAlt className="text-xl text-white" />
                </div>
                <div>
                  <h4 className="font-merriweather font-bold text-gray-800 text-lg mb-2">
                    Scenic Routes
                  </h4>
                  <p className="text-gray-600 font-rubik leading-relaxed">
                    Discover the most beautiful routes through Nashik's vineyards, hills, and historic sites.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lime-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMotorcycle className="text-xl text-white" />
                </div>
                <div>
                  <h4 className="font-merriweather font-bold text-gray-800 text-lg mb-2">
                    Bike-Friendly Spots
                  </h4>
                  <p className="text-gray-600 font-rubik leading-relaxed">
                    Find the best rest stops, fuel stations, and parking areas along your journey.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-xl text-white" />
                </div>
                <div>
                  <h4 className="font-merriweather font-bold text-gray-800 text-lg mb-2">
                    Time Estimates
                  </h4>
                  <p className="text-gray-600 font-rubik leading-relaxed">
                    Get accurate time estimates for each route to plan your day efficiently.
                  </p>
                </div>
              </div>
              <button
                onClick={downloadIternary}
                className="bg-gradient-to-r from-turquoise-blue to-sky-blue text-white px-8 py-4 rounded-full font-Inter font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Download Itinerary</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="testimonials" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-lime-green px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-merriweather font-bold mb-4">
              What Our Riders Say
            </h2>
            <p className="text-lg text-gray-300 font-rubik max-w-2xl mx-auto">
              Real experiences from real riders across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Excellent service! The bike was in perfect condition and the booking process was super smooth. Will definitely use again for my next trip to Nashik.",
                name: 'Rahul Kumar',
                location: 'Mumbai',
                initials: 'RK',
                color: 'bg-turquoise-blue',
              },
              {
                quote: "Best bike rental experience in Nashik! The staff was very helpful and the rates are very reasonable. The helmet provided was clean and well-maintained.",
                name: 'Priya Sharma',
                location: 'Pune',
                initials: 'PS',
                color: 'bg-coral',
              },
              {
                quote: "Amazing fleet of bikes! I rented a scooter for a week and had zero issues. The 24/7 support team was always available when I needed help.",
                name: 'Amit Mehta',
                location: 'Nashik',
                initials: 'AM',
                color: 'bg-lime-green',
              },
            ].map((review, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-sunny-yellow" />
                  ))}
                </div>
                <p className="text-gray-200 font-rubik leading-relaxed mb-6">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold font-Inter">{review.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-merriweather font-bold text-white">{review.name}</h4>
                    <p className="text-gray-400 font-rubik text-sm">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact-us">
        <Contact />
      </div>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-rubik text-2xl font-bold mb-6">
                95BikeRentals<span className="text-lime-green">.in</span>
              </h3>
              <p className="text-gray-400 font-rubik leading-relaxed mb-6">
                Your trusted partner for bike rentals in Nashik. Experience freedom on two wheels with our premium fleet and exceptional service.
              </p>
              <div className="flex gap-4">
                <button type="button" className="w-10 h-10 bg-turquoise-blue rounded-full flex items-center justify-center hover:bg-lime-green transition-all">
                  <FaFacebook className="text-white" />
                </button>
                <button type="button" className="w-10 h-10 bg-turquoise-blue rounded-full flex items-center justify-center hover:bg-lime-green transition-all">
                  <FaInstagram className="text-white" />
                </button>
                <a href="https://wa.me/917410192695" className="w-10 h-10 bg-turquoise-blue rounded-full flex items-center justify-center hover:bg-lime-green transition-all">
                  <FaWhatsapp className="text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-merriweather font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#why-choose-us" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#our-fleet" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Our Fleet
                  </a>
                </li>
                <li>
                  <a href="/booking" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Book Now
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-merriweather font-bold text-lg mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/booking" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Hourly Rentals
                  </a>
                </li>
                <li>
                  <a href="/booking" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Daily Rentals
                  </a>
                </li>
                <li>
                  <a href="/booking" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Weekly Packages
                  </a>
                </li>
                <li>
                  <a href="/booking" className="text-gray-400 hover:text-lime-green transition-all font-rubik">
                    Group Tours
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-merriweather font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaPhone className="text-turquoise-blue mt-1" />
                  <div>
                    <p className="text-gray-400 font-rubik">+91 74101 92695</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-turquoise-blue mt-1" />
                  <div>
                    <p className="text-gray-400 font-rubik">info@95bikerentals.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-turquoise-blue mt-1" />
                  <div>
                    <p className="text-gray-400 font-rubik">Nashik, Maharashtra, India</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 font-rubik">
              © 2024 95BikeRentals.in. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/917410192695"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50"
      >
        <FaWhatsapp className="text-3xl text-white" />
      </a>
    </>
  );
};

export default Home;
