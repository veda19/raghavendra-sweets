'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './components/ToggleTheme';
import Header from './components/Header';
import { FiMapPin, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { usePathname } from 'next/navigation'; // Updated import
const sweets = [
  { id: 1, name: 'Laddu', isBestSeller: true, image: '/images/Laddu.jpg' },
  { id: 2, name: 'Motichur Laddu', isBestSeller: true, image: '/images/MothiLaddu.jpg' },
  { id: 3, name: 'Badusha', isBestSeller: true, image: '/images/Badusha.jpg' },
  { id: 4, name: 'Malai Kaja', isBestSeller: true, image: '/images/MalaiKaja.jpg' },
  { id: 5, name: 'Ghee Mysorepak', isBestSeller: true, image: '/images/GheeMysorepak.jpg' },
  { id: 6, name: 'Sugar Free Laddu', isBestSeller: true, image: '/images/SugarFreeLaddu.jpg' },
  { id: 7, name: 'Kaju Pista Roll', isBestSeller: true, image: '/images/kajuPistaroll.jpg' },
  { id: 8, name: 'Kaju Barfi', isBestSeller: true, image: '/images/kajuBarfi.jpg' },
  { id: 9, name: 'Dry Fruit Laddu', isBestSeller: true, image: '/images/dryfruitladdu.jpg' },
  { id: 10, name: 'Dry Fruit Halwa', isBestSeller: true, image: '/images/DryFruitHalwa.jpg' },
  { id: 11, name: 'Pistachid Halwa', isBestSeller: true, image: '/images/PistachidHalwa.jpg' },
  { id: 12, name: 'Jangry', isBestSeller: true, image: '/images/Jangry.jpg' },
  { id: 13, name: 'Carrot Mysorepak', isBestSeller: true, image: '/images/CarrotMysorepak.jpg' },
  { id: 14, name: 'Horlicks Barfi', isBestSeller: true, image: '/images/HorlicksBarfi.jpg' },
  { id: 15, name: 'KajjiKayalu', isBestSeller: true, image: '/images/KajjiKayalu.jpg' },
  { id: 16, name: 'Ajmer Kalakand', isBestSeller: true, image: '/images/AjmerKalakand.jpg' },
  { id: 17, name: 'Horlicks Kalakand', isBestSeller: true, image: '/images/HorlicksKalakand.jpg' },
  { id: 18, name: 'Badam Ice Barfi', isBestSeller: true, image: '/images/BadamIceBarfi.jpg' },
  { id: 19, name: 'Venila Ice Barfi', isBestSeller: true, image: '/images/VenilaIceBarfi.jpg' },
  { id: 20, name: 'Sunnunda', isBestSeller: true, image: '/images/Sununda.jpg' },
  { id: 21, name: 'Bellam Sunnunda', isBestSeller: true, image: '/images/BellamSunnunda.jpg' },
  { id: 22, name: 'Chandrakala', isBestSeller: true, image: '/images/Chandrakala.jpg' },
  { id: 23, name: 'Gavvalu', isBestSeller: true, image: '/images/Gavvalu.jpg' },
  { id: 24, name: 'Bellam Gavvalu', isBestSeller: true, image: '/images/BellamGavvalu.jpg' },
  { id: 25, name: 'Arisalu', isBestSeller: true, image: '/images/Arisalu.jpg' },
  { id: 26, name: 'Nuvvula Laddu', isBestSeller: true, image: '/images/NuvvulaLaddu.jpg' },
  { id: 27, name: 'Putharekulu', isBestSeller: true, image: '/images/Putharekulu.jpg' },
  { id: 28, name: 'Sompapidi', isBestSeller: true, image: '/images/Sompapidi.jpg' },
  { id: 29, name: 'Strawberry Barfi', isBestSeller: true, image: '/images/StawberryBarfi.jpg' },
  { id: 30, name: 'Boast Barfi', isBestSeller: true, image: '/images/BoastBarfi.jpg' },
  { id: 31, name: 'Miriyala Kaju Fry', isBestSeller: true, image: '/images/MiriyalaKajuFry.jpg' },
  { id: 32, name: 'Mysorepak', isBestSeller: true, image: '/images/Mysorepak.jpg' },
  { id: 33, name: 'Butterstoch kowa', isBestSeller: true, image: '/images/Butterstochkova.jpg' },
  { id: 34, name: 'Malpuri', isBestSeller: true, image: '/images/Malpuri.jpg' },
];

const savouries = [
  { id: 1, name: 'Special Mixture', isBestSeller: true, image: '/images/SplMixture.jpg' },
  { id: 2, name: 'Mixture', isBestSeller: true, image: '/images/Mixture.jpg' },
  { id: 3, name: 'Kara Boondi', isBestSeller: true, image: '/images/KaraBoondi.jpg' },
  { id: 4, name: 'Masala Borugulu', isBestSeller: true, image: '/images/MslaBorugulu.jpg' },
  { id: 5, name: 'Banana Chips', isBestSeller: true, image: '/images/BananaChips.jpg' },
  { id: 6, name: 'Barfi', isBestSeller: true, image: '/images/Barfi.jpg' },
  { id: 7, name: 'Beetroot Murruku', isBestSeller: true, image: '/images/BeetrootMuruku.jpg' },
  { id: 8, name: 'Groundnut Murruku', isBestSeller: true, image: '/images/GroundnutMuruku.jpg' },
  { id: 9, name: 'Chekodi', isBestSeller: true, image: '/images/Chekodi.jpg' },
  { id: 10, name: 'Venna Murruku', isBestSeller: true, image: '/images/EnnaMuruku.jpg' },
  { id: 11, name: 'Finger Chips', isBestSeller: true, image: '/images/FingerChips.jpg' },
  { id: 12, name: 'Karam Gavvalu', isBestSeller: true, image: '/images/KaramGavvalu.jpg' },
  { id: 13, name: 'Kara Ompodi', isBestSeller: true, image: '/images/KaraOmpodi.jpg' },
  { id: 14, name: 'Kodem Billalu', isBestSeller: true, image: '/images/kodemBillalu.jpg' },
  { id: 15, name: 'Miriyala Muruku', isBestSeller: true, image: '/images/MiriyalaMuruku.jpg' },
  { id: 16, name: 'Motaas', isBestSeller: true, image: '/images/Motaas.jpg' },
  { id: 17, name: 'Masala Palli', isBestSeller: true, image: '/images/MslaPalli.jpg' },
  { id: 18, name: 'Om Podi', isBestSeller: true, image: '/images/OmPodi.jpg' },
  { id: 19, name: 'Palli Undalu', isBestSeller: true, image: '/images/PalliUndalu.jpg' },
  { id: 20, name: 'Pudina Murruku', isBestSeller: true, image: '/images/PudinaMuruku.jpg' },
  { id: 21, name: 'Ragi Murruku', isBestSeller: true, image: '/images/RagiMuruku.jpg' },
  { id: 22, name: 'Ribbon Murruku', isBestSeller: true, image: '/images/RibbonMuruku.jpg' },
  { id: 23, name: 'Saddu Murruku', isBestSeller: true, image: '/images/SadduMuruku.jpg' },
  { id: 24, name: 'Uddi Murruku', isBestSeller: true, image: '/images/UddiMuruku.jpg' },
  { id: 25, name: 'Uddi Chekkalu', isBestSeller: true, image: '/images/UddiChekkalu.jpg' },
];

export default function Home() {
    const pathname = usePathname(); // Using usePathname instead of useRouter

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);

  // Initialize theme based on localStorage or system preference
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCenterSlidePercentage(24); // lg: 4 items
      } else if (width >= 768) {
        setCenterSlidePercentage(48); // md: 2 items
      } else {
        setCenterSlidePercentage(70); // sm: 1 item
      }
    };

    updateSlidePercentage();
    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

 const heroImages = [
    '/images/AllSweets.webp',
    '/images/Savouries.png',
  '/images/VenilaIceBarfi.jpg',
   '/images/Arisalu.jpg',
     '/images/DryHalwaFull.jpg',
      '/images/Laddu.jpg',
  ]; 
  const carouselImages = [
    '/images/Exterior1.jpg',
    '/images/Interior1.jpg',
    '/images/Interior2.jpg',
  ];
  const [activeTab, setActiveTab] = useState<'sweets' | 'savouries' | 'podi'>('sweets');  
const [currentIndex, setCurrentIndex] = useState(0);
const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Match interval from your latest code
    return () => clearInterval(interval);
  }, []);
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
    behavior: 'smooth'
  });
};
  // Dynamic Tailwind classes based on theme
  // const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  // const textColor1 = theme === 'dark' ? 'text-gray-500' : 'text-black';
  // const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  // const headerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  // const sectionBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  // const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  // const footerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800';
  // const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
const textColor1 = theme === 'dark' ? 'text-blue-200' : 'text-black';
const bgColor = theme === 'dark' ? 'bg-neutral-950' : 'bg-white';
const headerBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-white';
const sectionBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100';
const cardBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-white';
const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-white';
const footerBg = theme === 'dark' ? 'bg-black' : 'bg-gray-800';
const hoverBg = theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-gray-100';

 const reasons = [
    {
      title: 'Legacy of Tradition',
      description:
        'Since 2000, we have honored time-tested recipes from Tirupati, creating sweets that reflect cultural richness and heartfelt devotion.',
    },
    {
      title: 'Pure Ingredients, Pure Bliss',
      description:
        'We use premium cattle ghee and handpicked ingredients to ensure every bite is rich, wholesome, and truly unforgettable.',
    },
    {
      title: 'Handcrafted with Love',
      description:
        'Every sweet is meticulously handcrafted by skilled artisans, preserving authenticity and delivering consistent, unmatched taste.',
    },
  ];
  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300 font-sans overflow-hidden`}>
      {/* Header */}
      <Header theme={theme} onThemeToggle={handleThemeToggle} />

      {/* Hero Section */}
<section className="mt-[74px] relative h-[60vh] flex items-center justify-center">
      <div className="absolute inset-0 rounded-lg overflow-hidden ">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              width={1200}
              height={600}
              className="w-full h-[60vh] object-cover"
              priority={index === 0} // Preload first image
              loading={index === 0 ? 'eager' : 'lazy'} // Optimize loading
            />
          </div>
        ))}
      </div>
   
<div className="relative text-center text-white px-4 sm:px-6 md:px-8 bg-cover bg-center">
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-[#aa969660]"></div> {/* Reduced opacity */}

  <div className="relative z-10">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 mt-6 tracking-tight leading-tight">
      Raghavendra Sweets & Savouries
    </h1>
    <p className="font-semibold text-sm sm:text-base md:text-lg mb-6 max-w-3xl mx-auto px-4 sm:px-6">
      Savor the rich, authentic flavors of Indian sweets, lovingly made with time-honored traditions.
    </p>
  </div>
</div>



    </section>
     

      {/* Best Sellers Section - Carousel Version */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className={`font-sans text-2xl sm:text-3xl font-bold text-center mb-8 ${textColor}`}>Our Sweets</h2>
        <div className="relative">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            centerMode={true}
            centerSlidePercentage={centerSlidePercentage}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <button
                onClick={clickHandler}
                disabled={!hasPrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
              </button>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <button
                onClick={clickHandler}
                disabled={!hasNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
              </button>
            )}
            className="max-w-7xl mx-auto"
          >
            {sweets
              .filter((sweet) => sweet.isBestSeller)
              .map((sweet) => (
                <div key={sweet.id} className="px-2 py-4 cursor-pointer">
                  <div className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col`}>
                    <div className="relative h-48 sm:h-56 md:h-64">
                      <Image
                        src={sweet.image}
                        alt={sweet.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className={`font-sans text-nowrap text-xl font-semibold ${textColor} mb-2 text-center`}>{sweet.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </section>
 {/* About Us Section */}
      <section className={`${sectionBg} py-12`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${textColor}`}>About Us</h2>
          <div className="max-w-6xl mx-auto text-center">
            <div className="mt-6">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                transitionTime={500}
                showStatus={false}
                showIndicators={false}
                showArrows={true}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Store image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <p className={`text-base sm:text-lg ${textColor} mb-4 mt-4`}>
           Founded in the year 2000 in the sacred city of Tirupati, Raghavendra Sweets has spent over two decades perfecting the art of traditional Indian sweet-making. What started as a modest sweet shop has blossomed into a cherished destination for authentic sweets and snacks, celebrated by generations of families and food lovers alike.
            </p>
            <p className={`text-base sm:text-lg ${textColor} mb-4`}>
             At Raghavendra Sweets, we believe that a sweet is not just a dessert — it is a celebration of culture, tradition, and devotion. Every piece we create is infused with the essence of purity and crafted with unwavering dedication, reflecting the spiritual richness of our roots in Tirupati.
            </p>
             <p className={`text-base sm:text-lg ${textColor} mb-4`}>
            Our sweets are more than just confections — they are handcrafted experiences, prepared using time-honored recipes that have been lovingly passed down through generations. From the richness of pure ghee to the perfect balance of flavors and textures, each item reflects our commitment to quality, authenticity, and taste.
           </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 ">
              <div className={`${cardBg} p-4 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}>
                <h3 className={`text-xl font-semibold ${textColor} mb-2 `}>Crafting Sweet Traditions Since 2000</h3>
                <p className={`text-sm ${textColor}`}>
                  Every bite tells a story of purity, devotion, and unmatched taste.
                </p>
              </div>
              <div className={`${cardBg} p-4 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}>
                <h3 className={`text-xl font-semibold ${textColor} mb-2`}>Where Tradition Meets Taste</h3>
                <p className={`text-sm ${textColor}`}>
                  Authentic Indian sweets made with love, purity, and legacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Services Section */}

<section className={`${sectionBg} py-12`}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`font-sans text-2xl sm:text-3xl font-bold text-center mb-8 ${textColor}`}>Our Services</h2>
    
    {/* Navigation Tabs */}
    <div className="flex justify-center mb-8 gap-3">
      {[
        { name: 'Sweets', path: '/sweets' },
        { name: 'Savouries', path: '/savouries' },
        { name: 'Podi', path: '/podi' }
      ].map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={`
            relative px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300
            transform hover:-translate-y-1 hover:scale-105 active:scale-95
            ${pathname === tab.path
              ? theme === 'dark'
                ? 'bg-neutral-700 text-white border-neutral-600 shadow-lg'
                : 'bg-gray-700 text-white border-gray-600 shadow-md'
              : theme === 'dark'
                ? 'text-neutral-300 border-neutral-700 hover:bg-neutral-800/70'
                : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-200'
            }
            overflow-hidden group
          `}
        >
          <span className={`
            absolute inset-0 w-full h-full transition-all duration-500
            ${theme === 'dark' ? 'bg-white/10' : 'bg-white/20'}
            opacity-0 group-hover:opacity-100
            ${pathname === tab.path ? '!opacity-0' : ''}
          `}></span>
          
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            {tab.name}
            <span className={`
              transition-transform duration-300
              ${pathname === tab.path ? 'scale-100' : 'scale-0 group-hover:scale-100'}
            `}></span>
          </span>
          
          {pathname === tab.path && (
            <span className={`
              absolute bottom-0 left-0 right-0 h-0.5 rounded-full
              ${theme === 'dark' ? 'bg-amber-400' : 'bg-amber-300'}
              animate-pulse
            `}></span>
          )}
        </Link>
      ))}
    </div>
    
    {/* Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Sweets Card */}
      <div className={`${cardBg} p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300`}>
        <div className="mb-4">
          <Image
            src="/images/Sweets.jpg"
            alt="Sweets"
            width={0}
            height={0}
            sizes="50vw"
            className="w-full h-48 rounded-md object-cover cursor-pointer"
          />
        </div>
        <h3 className={`font-sans text-xl font-semibold mb-3 text-center ${textColor}`}>Sweets</h3>
        <p className={`font-sans text-sm ${textColor} text-center`}>
          We offer a wide variety of traditional Indian sweets made with pure ghee and finest ingredients.
          From classic laddus to innovative sugar-free options, our sweets are crafted with decades of expertise.
        </p>
        <div className="mt-4 text-center">
          <Link 
            href="/sweets"
            className={`inline-flex items-center px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-300`}
          >
            View Sweets <FiChevronRight className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Savouries Card */}
      <div className={`${cardBg} p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300`}>
        <div className="text-center mb-4">
          <Image
            src="/images/Savouries.png"
            alt="Savouries"
            width={0}
            height={0}
            sizes="50vw"
            className="w-full h-48 rounded-md object-cover cursor-pointer"
          />
        </div>
        <h3 className={`font-sans text-xl font-semibold mb-3 text-center ${textColor}`}>Savouries</h3>
        <p className={`font-sans text-sm ${textColor} text-center`}>
          Our crispy and flavorful savouries are perfect for snacks and special occasions.
          Made with authentic recipes and premium ingredients, they offer a delightful crunch in every bite.
        </p>
        <div className="mt-4 text-center">
          <Link 
            href="/savouries"
            className={`inline-flex items-center px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-300`}
          >
            View Savouries <FiChevronRight className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Podi Card */}
      <div className={`${cardBg} p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300`}>
        <div className="text-center mb-4">
          <Image
            src="/images/Podi.jpg"
            alt="Podi"
            width={0}
            height={0}
            sizes="50vw"
            className="w-full h-48 rounded-md object-cover cursor-pointer"
          />
        </div>
        <h3 className={`font-sans text-xl font-semibold mb-3 text-center ${textColor}`}>Podi</h3>
        <p className={`font-sans text-sm ${textColor} text-center`}>
          Traditional South Indian powders made with authentic recipes and premium ingredients.
          Our podis enhance the flavor of your meals and are perfect for everyday cooking.
        </p>
        <div className="mt-4 text-center">
          <Link 
            href="/podi"
            className={`inline-flex items-center px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-300`}
          >
            View Podi <FiChevronRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Savouries Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className={`font-sans text-2xl sm:text-3xl font-bold text-center mb-8 ${textColor}`}>Our Savouries</h2>
        <div className="relative">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            centerMode={true}
            centerSlidePercentage={centerSlidePercentage}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <button
                onClick={clickHandler}
                disabled={!hasPrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
              </button>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <button
                onClick={clickHandler}
                disabled={!hasNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
              </button>
            )}
            className="max-w-7xl mx-auto"
          >
            {savouries
              .filter((savoury) => savoury.isBestSeller)
              .map((savoury) => (
                <div key={savoury.id} className="px-2 py-4 cursor-pointer">
                  <div className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col`}>
                    <div className="relative h-48 sm:h-56 md:h-64">
                      <Image
                        src={savoury.image}
                        alt={savoury.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className={`font-sans text-nowrap text-xl font-semibold ${textColor} mb-2 text-center`}>{savoury.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </section>
<section className={`${sectionBg} py-10 px-4 sm:px-6 lg:px-8 mt-4`}>
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <h2 className={`text-xl md:text-3xl font-bold text-center mb-10 ${textColor}`}>
      Our Franchises
    </h2>

    {/* Franchise Card */}

<div className="grid grid-cols-1 gap-6">
  {/* <div className={`${cardBg} p-6 rounded-lg shadow-md border ${borderColor}`}> */}
<div 
  className={`${cardBg} text-white rounded-lg border-2 ${textColor === 'text-white' ? 'border-gray-600' : 'border-gray-300'}  hover:scale-[1.02] shadow-lg transition-all duration-300 p-6`}
>    <h3 className={`text-lg md:text-lg font-semibold ${textColor} mb-4`}>Tirupati Main Branch</h3>
    <p className={`text-base sm:text-md ${textColor} leading-relaxed mb-6`}>
      10-2-125, Theertha Katta St, Nehru Nagar, Tirupati, Andhra Pradesh 517501
    </p>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=SRI+RAGHAVENDRA+SWEETS,+10-2-125,+Theertha+Katta+St,+Nehru+Nagar,+Tirupati,+Andhra+Pradesh+517501`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between px-4 py-3 mb-4 ${cardBg} text-white rounded-lg border ${textColor === 'text-white' ? 'border-gray-600' : 'border-gray-300'} ${hoverBg} transition-all duration-300`}
    >
      <span className={`text-sm md:text-base font-medium ${textColor}`}>View Location</span>
      <FiMapPin className={`text-lg md:text-xl ${textColor === 'text-white' ? 'text-white' : 'text-gray-800'}`} />
    </a>
    <a
      href={`tel:+919177777030`}
      className={`flex items-center justify-between px-4 py-3 ${cardBg} text-white rounded-lg border ${textColor === 'text-white' ? 'border-gray-600' : 'border-gray-300'} ${hoverBg} transition-all duration-300`}
    >
      <span className={`text-sm md:text-base font-medium ${textColor}`}>Call Now</span>
      <FiChevronRight className={`text-lg md:text-xl ${textColor === 'text-white' ? 'text-white' : 'text-gray-800'}`} />
    </a>
  </div>
</div>
  </div>
</section>
<section className={`bg-whitdark:text-white py-16 px-4 sm:px-6 lg:px-8 mt-4`}>
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <h2 className={`text-xl sm:text-3xl font-bold text-center mb-12 ${textColor}`}>
      Why Choose Us
    </h2>

    {/* Reasons Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {reasons.map((reason, index) => (
        <div
          key={index}
          className={`${cardBg} p-4 sm:p-6 rounded-lg shadow-md text-center ${hoverBg} hover:scale-105 transition-all duration-300 cursor-pointer max-w-md mx-auto`}
        >
          <h3 className={`text-lg sm:text-xl md:text-xl font-semibold ${textColor} mb-3`}>
            {reason.title}
          </h3>
          <p className={`text-base sm:text-md ${textColor} leading-relaxed`}>
            {reason.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Tradition Section */}
<section className={`${sectionBg} py-12`}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`font-sans text-2xl sm:text-3xl font-bold text-center mb-8 ${textColor}`}>
      Our Sweet Traditions
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className={`${cardBg} text-center px-4 py-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 font-sans cursor-pointer`}>
        <h3 className={`font-sans text-xl font-semibold mb-2 ${textColor}`}>
          Rooted in Tradition
        </h3>
        <p className={`${textColor}`}>
          Since 2000, we have honored age-old recipes from Tirupati, blending tradition with taste in every bite.
        </p>
      </div>

      <div className={`${cardBg} text-center px-4 py-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 font-sans cursor-pointer`}>
        <h3 className={`font-sans text-xl font-semibold mb-2 ${textColor}`}>
          Crafted with Purity
        </h3>
        <p className={`${textColor}`}>
          Made with pure cattle ghee and select ingredients, our sweets reflect devotion and quality.
        </p>
      </div>

      <div className={`${cardBg} text-center px-4 py-6 rounded-lg shadow-md ${hoverBg} hover:scale-[1.02] transition-all duration-300 font-sans cursor-pointer`}>
        <h3 className={`font-sans text-xl font-semibold mb-2 ${textColor}`}>
          Timeless Taste
        </h3>
        <p className={`${textColor}`}>
          Loved across generations, our sweets add joy to festivals, celebrations, and everyday moments.
        </p>
      </div>
    </div>
  </div>
</section>
{/* Floating Action Buttons */}
<div className="fixed bottom-2 right-1 z-50 flex flex-col gap-3">
  {/* WhatsApp Button - Always visible */}
  <a
    href="https://wa.me/919177777030?text=Hello%20Raghavendra%20Sweets%2C%20I%20would%20like%20to%20order%20some%20sweets%20and%20savouries"
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <FaWhatsapp className="h-6 w-6" />
  </a>

  {/* Scroll to Top Button - Only shows when scrolled down */}
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