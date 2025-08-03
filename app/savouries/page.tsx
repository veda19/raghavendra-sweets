'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for savouries
interface Savoury {
  id: number;
  name: string;
  isBestSeller: boolean;
  images: string[];
}

// Define TypeScript interface for Carousel props
interface CarouselProps {
  images: string[];
  savouryName: string;
  onImageClick: (image: string) => void;
}

const savouries: Savoury[] = [
  { id: 1, name: 'Special Mixture', isBestSeller: true, images: ['/images/SplMixture.jpg', '/images/SplMixtureGlass.jpg'] },
  { id: 2, name: 'Mixture', isBestSeller: true, images: ['/images/Mixture.jpg', '/images/MixtureGlass.jpg'] },
  { id: 3, name: 'Kara Boondi', isBestSeller: true, images: ['/images/KaraBoondi.jpg', '/images/KaraBoondi.jpg'] },
  { id: 4, name: 'Masala Borugulu', isBestSeller: true, images: ['/images/MslaBorugulu.jpg', '/images/MslaBorugulu.jpg'] },
  { id: 5, name: 'Banana Chips', isBestSeller: true, images: ['/images/BananaChips.jpg', '/images/BananaChipsGlass.jpg'] },
  { id: 6, name: 'Barfi', isBestSeller: true, images: ['/images/Barfi.jpg', '/images/Barfi.jpg'] },
  { id: 7, name: 'Beetroot Murruku', isBestSeller: true, images: ['/images/BeetrootMuruku.jpg', '/images/BeetrootMurukuGlass.jpg'] },
  { id: 8, name: 'Groundnut Murruku', isBestSeller: true, images: ['/images/GroundnutMuruku.jpg', '/images/GroundnutMuruku.jpg'] },
  { id: 9, name: 'Chekodi', isBestSeller: true, images: ['/images/Chekodi.jpg', '/images/ChekodiGlass.jpg'] },
  { id: 10, name: 'Venna Murruku', isBestSeller: true, images: ['/images/EnnaMuruku.jpg', '/images/EnnaMurukuGlass.jpg'] },
  { id: 11, name: 'Finger Chips', isBestSeller: true, images: ['/images/FingerChips.jpg', '/images/FingerChipsGlass.jpg'] },
  { id: 12, name: 'Karam Gavvalu', isBestSeller: true, images: ['/images/KaramGavvalu.jpg', '/images/KaramGavvalu.jpg'] },
  { id: 13, name: 'Kara Ompodi', isBestSeller: true, images: ['/images/KaraOmpodi.jpg', '/images/KaraOmpodiGlass.jpg'] },
  { id: 14, name: 'Kodem Billalu', isBestSeller: true, images: ['/images/kodemBillalu.jpg', '/images/kodemBillaluGlass.jpg'] },
  { id: 15, name: 'Miriyala Muruku', isBestSeller: true, images: ['/images/MiriyalaMuruku.jpg', '/images/MiriyalaMurukuGlass.jpg'] },
  { id: 16, name: 'Motaas', isBestSeller: true, images: ['/images/Motaas.jpg', '/images/MotaasGlass.jpg'] },
  { id: 17, name: 'Masala Palli', isBestSeller: true, images: ['/images/MslaPalli.jpg', '/images/MslaPalli.jpg'] },
  { id: 18, name: 'Om Podi', isBestSeller: true, images: ['/images/OmPodi.jpg', '/images/OmPodiGlass.jpg'] },
  { id: 19, name: 'Palli Undalu', isBestSeller: true, images: ['/images/PalliUndalu.jpg', '/images/PalliUndaluGlass.jpg'] },
  { id: 20, name: 'Pudina Murruku', isBestSeller: true, images: ['/images/PudinaMuruku.jpg', '/images/PudinaMurukuGlass.jpg'] },
  { id: 21, name: 'Ragi Murruku', isBestSeller: true, images: ['/images/RagiMuruku.jpg', '/images/RagiMurukuGlass.jpg'] },
  { id: 22, name: 'Ribbon Murruku', isBestSeller: true, images: ['/images/RibbonMuruku.jpg', '/images/RibbonMurukuGlass.jpg'] },
  { id: 23, name: 'Saddu Murruku', isBestSeller: true, images: ['/images/SadduMuruku.jpg', '/images/SagMuruku.jpg'] },
  { id: 24, name: 'Uddi Murruku', isBestSeller: true, images: ['/images/UddiMuruku.jpg', '/images/UddiMurukuGlass.jpg'] },
  { id: 25, name: 'Uddi Chekkalu', isBestSeller: true, images: ['/images/UddiChekkalu.jpg', '/images/UddiChekkaluGlass.jpg'] },
  { id: 26, name: 'Attukulu', isBestSeller: true, images: ['/images/Attukulu.jpg', '/images/Attukulu.jpg'] },
  { id: 27, name: 'Karasu', isBestSeller: true, images: ['/images/Karasu.jpg', '/images/Karasu.jpg'] },

];

const Carousel: React.FC<CarouselProps> = ({ images, savouryName, onImageClick }) => {
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
        alt={`${savouryName} ${currentIndex + 1}`}
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
            className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={`Previous image for ${savouryName}`}
          >
            <FaChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={nextImage}
            className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={`Next image for ${savouryName}`}
          >
            <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
            {images.map((_, index) => (
              <span
                key={`${savouryName}-indicator-${index}`}
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

export default function Savouries() {
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
            Our Savouries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savouries
              .filter((savoury) => savoury.isBestSeller)
              .map((savoury) => (
                <div
                  key={`savoury-${savoury.id}`}
                  className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border ${borderColor} flex flex-col`}
                >
                  <Carousel images={savoury.images} savouryName={savoury.name} onImageClick={openPreview} />
                  <div className="p-4 flex-grow flex flex-col justify-center">
                    <h3 className={`font-sans text-lg sm:text-xl font-semibold ${textColor} text-center`}>
                      {savoury.name}
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
            The Importance of Savouries
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className={`text-base sm:text-lg ${textColor} mb-6 leading-relaxed`}>
              In Indian cuisine, savouries bring a burst of flavor and crunch to every occasion. From festive celebrations to everyday snacking, they embody tradition and craftsmanship. At Raghavendra Sweets, our savouries are crafted with authentic spices and premium ingredients to delight your taste buds.
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
                We use high-quality spices, fresh nuts, and premium flours to create savouries that are bursting with authentic flavors and perfect crunch.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Handcrafted Excellence
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                Our savouries are crafted by skilled artisans using traditional recipes from Tirupati, ensuring every bite is a taste of heritage.
              </p>
            </div>
            <div className={`${cardBg} cursor-pointer p-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 border ${borderColor}`}>
              <h3 className={`font-sans text-xl font-semibold mb-3 ${textColor}`}>
                Hygienic Preparation
              </h3>
              <p className={`text-base ${textColor} leading-relaxed`}>
                We maintain strict hygiene standards in our kitchens, ensuring that every savoury is prepared in a clean and safe environment.
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
            alt="Savoury preview"
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