'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for sweets
interface Sweet {
  id: number;
  name: string;
  isBestSeller: boolean;
  images: string[];
}

// Define TypeScript interface for Carousel props
interface CarouselProps {
  images: string[];
  sweetName: string;
  onImageClick: (image: string) => void;
}

const sweets: Sweet[] = [
  { id: 1, name: 'Laddu', isBestSeller: true, images: ['/images/Laddu.jpg', '/images/LadduGlass.jpg'] },
  { id: 2, name: 'Motichur Laddu', isBestSeller: true, images: ['/images/MothiLaddu.jpg', '/images/MothiLadduGlass.jpg'] },
  { id: 3, name: 'Badusha', isBestSeller: true, images: ['/images/Badusha.jpg', '/images/BadushaGlass.jpg'] },
  { id: 4, name: 'Malai Kaja', isBestSeller: true, images: ['/images/MalaiKaja.jpg', '/images/MalaiKajaGlass.jpg'] },
  { id: 5, name: 'Ghee Mysorepak', isBestSeller: true, images: ['/images/GheeMysorepak.jpg', '/images/GheeMysorepakGlass.jpg'] },
  { id: 6, name: 'Sugar Free Laddu', isBestSeller: true, images: ['/images/SugarFreeLaddu.jpg', '/images/SugarFreeLadduGlass.jpg'] },
  { id: 7, name: 'Kaju Pista Roll', isBestSeller: true, images: ['/images/kajuPistaroll.jpg', '/images/kajuPistarollGlass.jpg'] },
  { id: 8, name: 'Kaju Barfi', isBestSeller: true, images: ['/images/kajuBarfi.jpg', '/images/KajuBarfiGlass.jpg'] },
  { id: 9, name: 'Dry Fruit Laddu', isBestSeller: true, images: ['/images/dryfruitladdu.jpg', '/images/DryFruitladduGlass.jpg'] },
  { id: 10, name: 'Dry Fruit Halwa', isBestSeller: true, images: ['/images/DryFruitHalwa.jpg', '/images/DryFruitHalwaGlass.jpg'] },
  { id: 11, name: 'Pistachid Halwa', isBestSeller: true, images: ['/images/PistachidHalwa.jpg', '/images/PistachidHalwaGlass.jpg'] },
  { id: 12, name: 'Jangry', isBestSeller: true, images: ['/images/Jangry.jpg', '/images/JangryGlass.jpg'] },
  { id: 13, name: 'Carrot Mysorepak', isBestSeller: true, images: ['/images/CarrotMysorepak.jpg', '/images/CarrotMysorepakGlass.jpg'] },
  { id: 14, name: 'Horlicks Barfi', isBestSeller: true, images: ['/images/HorlicksBarfi.jpg', '/images/HorlicksBarfiGlass.jpg'] },
  { id: 15, name: 'KajjiKayalu', isBestSeller: true, images: ['/images/KajjiKayalu.jpg', '/images/KajjiKayalu.jpg'] },
  { id: 16, name: 'Ajmer Kalakand', isBestSeller: true, images: ['/images/AjmerKalakand.jpg', '/images/AjmerKalakandGlass.jpg'] },
  { id: 17, name: 'Horlicks Kalakand', isBestSeller: true, images: ['/images/HorlicksKalakand.jpg', '/images/HorlicksKalakandGlass.jpg'] },
  { id: 18, name: 'Badam Ice Barfi', isBestSeller: true, images: ['/images/BadamIceBarfi.jpg', '/images/BadamIceBarfiGlass.jpg'] },
  { id: 19, name: 'Venila Ice Barfi', isBestSeller: true, images: ['/images/VenilaIceBarfi.jpg', '/images/VenilaIceBarfiGlass.jpg'] },
  { id: 20, name: 'Sunnunda', isBestSeller: true, images: ['/images/Sununda.jpg', '/images/Sununda.jpg'] },
  { id: 21, name: 'Bellam Sunnunda', isBestSeller: true, images: ['/images/BellamSunnunda.jpg', '/images/BellamSunnunda.jpg'] },
  { id: 22, name: 'Chandrakala', isBestSeller: true, images: ['/images/Chandrakala.jpg', '/images/ChandrakalaGlass.jpg'] },
  { id: 23, name: 'Gavvalu', isBestSeller: true, images: ['/images/Gavvalu.jpg', '/images/Gavvalu.jpg'] },
  { id: 24, name: 'Bellam Gavvalu', isBestSeller: true, images: ['/images/BellamGavvalu.jpg', '/images/BellamGavvalu.jpg'] },
  { id: 25, name: 'Arisalu', isBestSeller: true, images: ['/images/Arisalu.jpg', '/images/ArisaluGlass.jpg'] },
  { id: 26, name: 'Nuvvula Laddu', isBestSeller: true, images: ['/images/NuvvulaLaddu.jpg', '/images/NuvvulaLadduGlass.jpg'] },
  { id: 27, name: 'Putharekulu', isBestSeller: true, images: ['/images/Putharekulu.jpg', '/images/Putharekulu.jpg'] },
  { id: 28, name: 'Sompapidi', isBestSeller: true, images: ['/images/Sompapidi.jpg', '/images/SompapidiGlass.jpg'] },
  { id: 29, name: 'Strawberry Barfi', isBestSeller: true, images: ['/images/StawberryBarfi.jpg', '/images/StawberryBarfiGlass.jpg'] },
  { id: 30, name: 'Boast Barfi', isBestSeller: true, images: ['/images/BoastBarfi.jpg', '/images/BoastBarfi.jpg'] },
  { id: 31, name: 'Miriyala Kaju Fry', isBestSeller: true, images: ['/images/MiriyalaKajuFry.jpg', '/images/MiriyalaKajuFry.jpg'] },
  { id: 32, name: 'Malpuri', isBestSeller: true, images: ['/images/Malpuri.jpg', '/images/MalpuriGlass.jpg'] },
  { id: 33, name: 'Butterstoch Kowa', isBestSeller: true, images: ['/images/Butterstochkova.jpg', '/images/ButterstochkovaGlass.jpg'] },
];


const Carousel: React.FC<CarouselProps> = ({ images, sweetName, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }
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

  return (
    <div
      className="relative h-48 sm:h-56 md:h-64 w-full cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Image
        src={images[currentIndex] || '/images/placeholder.jpg'}
        alt={`${sweetName} ${currentIndex + 1}`}
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
            aria-label="Previous image"
          >
            <FaChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
            aria-label="Next image"
          >
            <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
            {images.map((_, index) => (
              <span
                key={index}
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

export default function Sweets() {
    const router = useRouter(); 
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
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

  const handleThemeToggle = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openPreview = useCallback((image: string) => {
    setPreviewImage(image);
  }, []);

  const closePreview = useCallback(() => {
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
            Our Sweets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets
              .filter((sweet) => sweet.isBestSeller)
              .map((sweet) => (
                <div
                  key={sweet.id}
                  className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border ${borderColor} flex flex-col`}
                >
                  <Carousel images={sweet.images} sweetName={sweet.name} onImageClick={openPreview} />
                  <div className="p-4 flex-grow flex flex-col justify-center">
                    <h3 className={`font-sans text-lg sm:text-xl font-semibold ${textColor} text-center`}>
                      {sweet.name}
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
            The Importance of Sweets
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className={`text-base sm:text-lg ${textColor} mb-6 leading-relaxed`}>
              In Indian culture, sweets symbolize joy, celebration, and togetherness. Whether during festivals, weddings, or family gatherings, they represent love and prosperity. At Raghavendra Sweets, we honor this tradition by crafting delicious treats that connect generations and evoke cherished memories.
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
                We use only the finest ingredients, including pure cattle ghee, handpicked nuts, and natural sweeteners, to ensure every sweet is rich, wholesome, and authentic.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Handcrafted Excellence
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                Our sweets are meticulously handcrafted by skilled artisans who follow time-honored recipes from Tirupati, preserving the authenticity and quality in every bite.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Hygienic Preparation
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                We maintain the highest standards of cleanliness and hygiene in our kitchens, ensuring that every sweet is prepared in a safe and pristine environment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <button
            onClick={closePreview}
            className="cursor-pointer absolute top-4 right-4 p-2 sm:p-3 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
            aria-label="Close preview"
          >
            <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <Image
            src={previewImage}
            alt="Sweet preview"
            width={1200}
            height={800}
            className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
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
          className="p-3 sm:p-4 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-3 sm:p-4 rounded-full shadow-lg bg-gray-800 hover:bg-gray-900 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 24 24"
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