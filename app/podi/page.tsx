'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for podis
interface Podi {
  id: number;
  name: string;
  isBestSeller: boolean;
  images: string[];
}

// Define TypeScript interface for Carousel props
interface CarouselProps {
  images: string[];
  podiName: string;
  onImageClick: (image: string) => void;
}

const podis: Podi[] = [
  { id: 1, name: 'Idli Karam', isBestSeller: true, images: ['/images/IdliKaram.jpg'] },
  { id: 2, name: 'Senagapappu Karam', isBestSeller: true, images: ['/images/SenagapappuKaram.jpg'] },
  { id: 3, name: 'Karivepaku Karam', isBestSeller: true, images: ['/images/CurryLeafPodi.jpg'] },
];

const Carousel: React.FC<CarouselProps> = ({ images, podiName, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isPaused, images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-48 sm:h-56 md:h-64 w-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative h-48 sm:h-56 md:h-64 w-full cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Image
        src={images[currentIndex] || '/images/placeholder.jpg'}
        alt={`${podiName} ${currentIndex + 1}`}
        fill
        className="object-cover rounded-t-lg"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onClick={() => onImageClick(images[currentIndex])}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={`Previous image for ${podiName}`}
          >
            <FaChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={`Next image for ${podiName}`}
          >
            <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
            {images.map((_, index) => (
              <span
                key={`${podiName}-indicator-${index}`}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-400'
                } transition-all duration-300`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Podis() {
    const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openPreview = useCallback((image: string) => {
    setPreviewImage(image);
  }, []);

  const closePreview = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPreviewImage(null);
  }, []);

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-neutral-950' : 'bg-white';
  const sectionBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-white';
  const hoverBg = theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-gray-50';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300 font-sans overflow-hidden`}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <section className={`${sectionBg} py-12`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`mt-12 font-sans text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 ${textColor}`}>
            Our Podis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podis
              .filter((podi) => podi.isBestSeller)
              .map((podi) => (
                <div
                  key={`podi-${podi.id}`}
                  className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border ${borderColor} flex flex-col`}
                >
                  <Carousel images={podi.images} podiName={podi.name} onImageClick={openPreview} />
                  <div className="p-4 flex-grow flex flex-col justify-center">
                    <h3 className={`font-sans text-lg sm:text-xl font-semibold ${textColor} text-center`}>
                      {podi.name}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className={`py-12`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-sans text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 ${textColor}`}>
            The Importance of Podis
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className={`text-base sm:text-lg ${textColor} mb-6 leading-relaxed`}>
              In Indian cuisine, podis are aromatic spice blends that elevate every meal with their rich flavors. Perfect for enhancing dosas, idlis, or rice, our podis at Raghavendra Sweets are crafted with traditional recipes and premium spices to bring authentic taste to your table.
            </p>
          </div>
        </div>
      </section>
      <section className={`py-12`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-sans text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 ${textColor}`}>
            Crafted with Care and Tradition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Premium Ingredients
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                We source the finest spices and ingredients, roasted and ground to perfection, to create podis that deliver authentic and robust flavors.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Handcrafted Excellence
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                Our podis are crafted using time-honored recipes from Tirupati, blended by skilled artisans to ensure consistency and quality in every pinch.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Hygienic Preparation
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                We maintain the highest standards of cleanliness in our kitchens, ensuring that every podi is prepared in a safe and hygienic environment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <button
            onClick={closePreview}
            className="cursor-pointer absolute top-4 right-4 p-2 sm:p-3 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Close preview"
          >
            <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <Image
            src={previewImage}
            alt="Podi preview"
            width={1200}
            height={800}
            className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
            priority={true}
          />
        </div>
      )}
        <button
  onClick={() => router.push('/')}
  className={`ml-4 mb-4 cursor-pointer rounded-lg flex items-center gap-1 p-3 pl-6 pr-6  ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
>
  ← Back
</button>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919177777030?text=Hello%20Raghavendra%20Sweets%2C%20I%20would%20like%20to%20order%20some%20sweets%20and%20savouries"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-4 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-3 sm:p-4 rounded-full shadow-lg bg-gray-800 hover:bg-gray-900 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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