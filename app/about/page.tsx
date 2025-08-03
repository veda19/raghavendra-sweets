'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutUsSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  // Theme variables
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const sectionBg = theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-neutral-700' : 'border-gray-200';
  const accentColor = theme === 'dark' ? 'text-amber-300' : 'text-amber-600';
  const accentBg = theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50';
  const buttonBg = theme === 'dark' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-amber-500 hover:bg-amber-400';
const [showScrollButton, setShowScrollButton] = useState(false);
const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
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
  // Carousel images
  const carouselImages = [
    '/images/ExteriorMain.jpg',
    '/images/Exterior1.jpg',
    '/images/Interior1.jpg',
    '/images/Interior2.jpg',
  ];

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

  // Custom arrow components for carousel
  const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean, label: string) => (
    <button
      onClick={clickHandler}
      disabled={!hasPrev}
      aria-label={label}
      className={`absolute left-4 z-10 p-2 rounded-full ${buttonBg} text-white shadow-lg transform transition-all hover:scale-110 focus:outline-none`}
      style={{ top: '50%' }}
    >
      <ChevronLeft size={24} />
    </button>
  );

  const renderArrowNext = (clickHandler: () => void, hasNext: boolean, label: string) => (
    <button
      onClick={clickHandler}
      disabled={!hasNext}
      aria-label={label}
      className={`absolute right-4 z-10 p-2 rounded-full ${buttonBg} text-white shadow-lg transform transition-all hover:scale-110 focus:outline-none`}
      style={{ top: '50%' }}
    >
      <ChevronRight size={24} />
    </button>
  );

  return (
    
    <section className={`${sectionBg} min-h-screen py-12 md:py-16`}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      
      <div className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-xl sm:text-3xl font-bold mb-6 ${textColor} leading-tight`}>
              About <span className={`${accentColor} relative`}>
                Us
                <span className={`absolute -bottom-2 left-0 w-full h-1 ${theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'}`}></span>
              </span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textColorSecondary}`}>
              Preserving tradition through authentic Indian sweets since 2000
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <h3 className={`text-2xl font-semibold mb-6 ${textColor}`}>
                  <span className={`${accentColor}  font-bold`}>Two Decades</span> of Sweet Excellence
                </h3>
                <p className={`text-lg leading-relaxed ${textColorSecondary} mb-6`}>
Founded in 2000 in the sacred city of Tirupati, Sri Raghavendra Savoury & Sweet Home  began as a small family business with a deep passion for crafting traditional Indian sweets and savouries. What started as a humble venture quickly became beloved by the local community and pilgrims, thanks to its unwavering commitment to quality and authenticity. Over the years, it has grown into an institution, cherished for its dedication to preserving time-honored recipes passed down through generations.       
         </p>
         
              </div>
              

              <div className={`p-8 rounded-xl ${accentBg} border ${borderColor} shadow-sm`}>
                <h4 className={`text-2xl font-semibold mb-4 ${accentColor}`}>Our Sweet Philosophy</h4>
                <p className={`${textColorSecondary} italic`}>
                  &quot;We believe sweets are not just desserts, but carriers of culture, tradition, and heartfelt emotions. Every piece we create is infused with devotion and crafted to perfection.&quot;
                </p>
              </div>

              <ul className={`space-y-4 ${textColorSecondary}`}>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${accentColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg">Pure ingredients including premium cattle ghee</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${accentColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg">Traditional recipes passed down through generations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${accentColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg">Handcrafted by skilled artisans with decades of experience</span>
                </li>
                   <li className="flex items-start gap-3">
                  <span className={`mt-1 ${accentColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg">Made with 100% natural ingredients, free from artificial additives</span>
                </li>
                         <li className="flex items-start gap-3">
                  <span className={`mt-1 ${accentColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg">Every bite delivers the warmth of homemade tradition</span>
                </li>
              </ul>
            </div>

     
            {/* Carousel */}
<div className="relative order-1 lg:order-2">
  <div className="rounded-2xl overflow-hidden shadow-xl">
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={5000}
      transitionTime={700}
      showStatus={false}
      showIndicators={true}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      renderIndicator={(onClickHandler, isSelected, index, label) => (
        <button
          type="button"
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          key={index}
          className={`mx-1 w-3 h-3 rounded-full transition-all ${isSelected ? 'bg-amber-500 w-6' : 'bg-gray-300'}`}
          aria-label={`Slide ${index + 1}`}
        />
      )}
      className="rounded-lg"
    >
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className="relative h-64 md:h-96 lg:h-[38rem] cursor-pointer"
          onClick={() => setSelectedImageIndex(index)}
        >
          <Image
            src={image}
            alt={`Store image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </Carousel>
  </div>
</div>
          </div>

          {/* Key points section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            <div className={`p-8 rounded-xl ${cardBg} shadow-lg border ${borderColor} hover:scale-105 shadow-xl transition-all duration-300 group cursor-pointer `}>
              <div className={`w-12 h-12 ${accentBg} rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold mb-4 ${textColor}`}>Our Roots</h4>
              <p className={`${textColorSecondary} leading-relaxed`}>
                Founded in 2000 in Tirupati, we&apos;ve stayed true to our origins while growing to serve sweet lovers across the region with authentic flavors.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${cardBg} shadow-lg border ${borderColor} hover:scale-105 shadow-xl transition-all duration-300 group cursor-pointer `}>
              <div className={`w-12 h-12 ${accentBg} rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold mb-4 ${textColor}`}>Our Craft</h4>
              <p className={`${textColorSecondary} leading-relaxed`}>
                Each sweet is handcrafted using traditional techniques that preserve the authentic flavors and textures of our heritage.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${cardBg} shadow-lg border ${borderColor} hover:scale-105 shadow-xl transition-all duration-300 group cursor-pointer`}>
              <div className={`w-12 h-12 ${accentBg} rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className={`text-xl font-semibold mb-4 ${textColor}`}>Our Promise</h4>
              <p className={`${textColorSecondary} leading-relaxed`}>
                Quality and purity in every bite, just as it&apos;s been since our founding over two decades ago. Your trust is our most cherished ingredient.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us WhatsApp Section */}
<div className="mt-12 max-w-7xl mx-auto text-center">
  <h2 className={`text-xl sm:text-3xl font-bold mb-6 ${textColor} leading-tight`}>
    Contact <span className={`${accentColor} relative`}>Us
      <span className={`absolute -bottom-2 left-0 w-full h-1 ${theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'}`}></span>
    </span>
  </h2>
  <p className={`text-lg max-w-3xl mx-auto ${textColorSecondary} mb-8`}>
    Reach out to us on WhatsApp for inquiries or orders!
  </p>
  <a
    href="https://wa.me/+919177777030"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block px-6 py-3 rounded-lg ${buttonBg} text-white font-semibold shadow-lg transform transition-all hover:scale-105 focus:outline-none`}
  >
    Contact Us on WhatsApp
  </a>
</div>
<button
  onClick={() => router.push('/')}
  className={` ml-4 relative top-10  mb-2 cursor-pointer rounded-lg flex items-center gap-1 p-3 pl-6 pr-6  ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
>
  ← Back
</button>
{/* Scroll to Top Button */}
{showScrollButton && (
  <button
    onClick={scrollToTop}
    className={`cursor-pointer fixed bottom-4 right-4 z-50 p-4 rounded-full shadow-lg ${buttonBg} text-white transition-all duration-300 hover:scale-110 focus:outline-none`}
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
  
{/* Image Preview Modal */}
{selectedImageIndex !== null && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
    onClick={() => setSelectedImageIndex(null)}
  >
    <div
      className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedImageIndex(null)}
        className={`cursor-pointer absolute -top-4 right-0 p-2 rounded-full ${buttonBg} text-white shadow-lg transition-all hover:scale-110 focus:outline-none z-10`}
        aria-label="Close preview"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImageIndex((prev) => 
            prev === 0 ? carouselImages.length - 1 : (prev || 0) - 1
          );
        }}
        className={`cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full ${buttonBg} text-white shadow-lg transition-all hover:scale-110 focus:outline-none z-10`}
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImageIndex((prev) => 
            prev === carouselImages.length - 1 ? 0 : (prev || 0) + 1
          );
        }}
        className={`cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full ${buttonBg} text-white shadow-lg transition-all hover:scale-110 focus:outline-none z-10`}
        aria-label="Next image"
      >
        <ChevronRight size={18} />
      </button>

      {/* Full-Screen Image Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={carouselImages[selectedImageIndex]}
          alt={`Store image ${selectedImageIndex + 1}`}
          fill
          className="object-contain"
          style={{ maxHeight: '90vh', maxWidth: '100%' }}
          priority={selectedImageIndex === 0}
        />
      </div>
    </div>
  </div>
)}
    </section>
  );
}