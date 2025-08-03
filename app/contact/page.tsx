'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiChevronRight, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import Header from '../components/Header';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const pathname = usePathname();
    const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Dynamic Tailwind classes based on theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textColor1 = theme === 'dark' ? 'text-blue-200' : 'text-blue-600';
  const bgColor = theme === 'dark' ? 'bg-neutral-950' : 'bg-white';
  const headerBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-white';
  const sectionBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const footerBg = theme === 'dark' ? 'bg-black' : 'bg-gray-800';
  const hoverBg = theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-gray-100';
  const accentColor = theme === 'dark' ? 'text-amber-400' : 'text-amber-600';

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300 font-sans overflow-hidden`}>
      {/* Header */}
      <Header theme={theme} onThemeToggle={handleThemeToggle} />

      {/* Hero Section */}
      <section className=" relative mt-[74px] h-[60vh] flex items-center justify-center bg-[url('/images/sweets-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-6 text-white leading-tight mt-4">
            Get in Touch With Us
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We&apos;re here to assist you with orders, inquiries, or just to hear your sweet feedback!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="tel:+919177777030"
              className="text-nowrap px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium flex items-center gap-2 transition-all"
            >
              <FiPhone className="text-lg " /> Call Now
            </a>
            <a
              href="https://wa.me/919177777030"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nowrap px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium flex items-center gap-2 transition-all"
            >
              <FaWhatsapp className="text-lg" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${textColor}`}>
              How Can We Help You?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose your preferred way to connect with us for orders, catering, or any inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className={`${cardBg} p-8 rounded-xl shadow-lg border ${borderColor} cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
              <div className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'} flex items-center justify-center mb-6`}>
                <FiPhone className={`text-2xl ${accentColor}`} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Call Us</h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Speak directly with our team for immediate assistance.
              </p>
              <a
                href="tel:+919177777030"
                className={`inline-flex items-center font-medium ${textColor1} hover:underline`}
              >
                +91 9177777030 <FiChevronRight className="ml-1" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className={`${cardBg} p-8 rounded-xl shadow-lg border ${borderColor}  cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
              <div className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center mb-6`}>
                <FaWhatsapp className={`text-2xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>WhatsApp</h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Message us for quick responses and easy ordering.
              </p>
              <a
                href="https://wa.me/919177777030"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center font-medium ${textColor1} hover:underline`}
              >
                Chat Now <FiChevronRight className="ml-1" />
              </a>
            </div>

            {/* Visit Us Card */}
            <div className={`${cardBg} p-8 rounded-xl shadow-lg border ${borderColor}  cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
              <div className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center mb-6`}>
                <FiMapPin className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Visit Us</h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Come taste our sweets in person at our Tirupati location.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=SRI+RAGHAVENDRA+SWEETS,+10-2-125,+Theertha+Katta+St,+Nehru+Nagar,+Tirupati,+Andhra+Pradesh+517501"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center font-medium ${textColor1} hover:underline`}
              >
                Get Directions <FiChevronRight className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Details Section */}
      <section className={`${sectionBg} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            {/* Map */}
            <div className={`rounded-xl overflow-hidden shadow-xl h-full min-h-[400px]`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.614093695304!2d79.4182073!3d13.6350614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0473701c2b%3A0x88f9fc27fe88357f!2sSRI%20RAGHAVENDRA%20SWEETS!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[400px]"
              />
            </div>

            {/* Contact Details */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${textColor}`}>Our Store Details</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                    <FiMapPin className={`text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${textColor}`}>Address</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      10-2-125, Theertha Katta St, Nehru Nagar, Tirupati, Andhra Pradesh 517501
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=SRI+RAGHAVENDRA+SWEETS,+10-2-125,+Theertha+Katta+St,+Nehru+Nagar,+Tirupati,+Andhra+Pradesh+517501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center mt-2 text-sm font-medium ${textColor1} hover:underline`}
                    >
                      View on Google Maps <FiChevronRight className="ml-1" />
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-100'}`}>
                    <FiClock className={`text-xl ${accentColor}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${textColor}`}>Opening Hours</h3>
                    <div className={`space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p className="flex justify-between max-w-xs">
                        <span>Monday - Sunday:</span> <span>8:30 AM - 9:30 PM</span>
                      </p>
                    
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'}`}>
                    <FiPhone className={`text-xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${textColor}`}>Phone</h3>
                    <a
                      href="tel:+919177777030"
                      className={`block ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} font-medium`}
                    >
                      +91 9177777030
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'}`}>
                    <FaWhatsapp className={`text-xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${textColor}`}>WhatsApp</h3>
                    <a
                      href="https://wa.me/919177777030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} font-medium`}
                    >
                      +91 9177777030
                    </a>
                  </div>
                </div>            
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Image Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${textColor}`}>
            Our Sweet Store
          </h2>
          <div className="m-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/ExteriorMain.jpg"
                alt="Raghavendra Sweets Store Front"
                width={800}
                height={600}
                className="w-full h-auto  object-cover"
                loading="lazy"
              />
            </div>
        
          </div>
        </div>
      </section>
      <div className="fixed bottom-6 leftt-6 z-50 flex flex-col gap-3">

  <a
          href="tel:+919177777030"
          className="p-4 rounded-full shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Call Raghavendra Sweets"
        >
          <FiPhone className="h-6 w-6" />
        </a>
        </div>
        <div className='flex justify-center items-center'>
          <button
  onClick={() => router.push('/')}
  className={`ml-4 mb-2 cursor-pointer rounded-lg  gap-1 p-3 pl-6 pr-6  ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
>
  ← Back
</button>
</div>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919177777030"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>

      
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-4 rounded-full shadow-lg bg-gray-800 hover:bg-gray-900 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}