'use client';

import Image from "next/image";
import SplitText from "./components/SplitText";
import MobileMenu from "./components/MobileMenu";
import { useState, useEffect, useCallback } from "react";

interface Product {
  name: string;
  img: string;
  description: string;
  price: string;
}

interface Testimonial {
  text: string;
  name: string;
  rating: number;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function CompanyProfile() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };



  // Set client state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const products: Product[] = [
    { 
      name: "Madu Hutan", 
      img: "/product-madu.jpg",
      description: "Madu hutan asli dengan rasa yang khas dan kaya antioksidan",
      price: "Rp 85.000"
    },
    { 
      name: "Madu Randu", 
      img: "/product-madu.jpg",
      description: "Madu randu dengan tekstur lembut dan aroma yang harum",
      price: "Rp 75.000"
    },
    { 
      name: "Madu Multifloral", 
      img: "/product-madu.jpg",
      description: "Campuran berbagai bunga dengan nutrisi yang lengkap",
      price: "Rp 90.000"
    },
  ];

  const testimonials: Testimonial[] = [
    {
      text: "Madu terbaik yang pernah saya coba! Rasanya alami dan segar.",
      name: "Andi Pratama",
      rating: 5
    },
    {
      text: "Saya selalu membeli Madow Honey untuk keluarga. Sehat dan berkualitas.",
      name: "Siti Rahma",
      rating: 5
    },
    {
      text: "Pelayanan cepat dan kemasan rapi. Highly recommended!",
      name: "Budi Santoso",
      rating: 5
    },
  ];

  const features: Feature[] = [
    {
      icon: "✓",
      title: "100% Murni",
      description: "Tanpa campuran gula atau bahan pengawet buatan"
    },
    {
      icon: "◉",
      title: "Organik Bersertifikat",
      description: "Diproduksi dari peternakan lebah organik terpercaya"
    },
    {
      icon: "★",
      title: "Kualitas Premium",
      description: "Telah melewati kontrol kualitas yang ketat"
    },
    {
      icon: "⚡",
      title: "Pengiriman Cepat",
      description: "Dikirim fresh dengan kemasan yang aman"
    }
  ];

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'products', 'certificates', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === 'undefined') return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const renderStars = useCallback((rating: number) => {
    return (
      <div className="flex justify-center" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ⭐
          </span>
        ))}
      </div>
    );
  }, []);

  return (
    <div className="font-cinzel bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src="/logo.jpg"
                  alt="Madow Honey Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Madow Honey</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {['home', 'about', 'products', 'certificates', 'testimonials', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-200 ${
                      activeSection === section
                        ? 'text-white font-semibold'
                        : 'text-gray-50 hover:text-white'
                    }`}
                  >
                    {section === 'home' ? 'Beranda' :
                     section === 'about' ? 'Tentang' :
                     section === 'products' ? 'Produk' :
                     section === 'certificates' ? 'Sertifikat' :
                     section === 'testimonials' ? 'Testimoni' : 'Kontak'}
                  </button>
                ))}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
                <a
                  href="https://instagram.com/madowhoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-pink-300 transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@madowhoneyofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-gray-300 transition-colors duration-200"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/6282283350842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-green-300 transition-colors duration-200"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-section.jpg"
            alt="Madu alami berkualitas tinggi"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Fallback to gradient background
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(to bottom right, #fde68a, #f59e0b, #ea580c)';
              }
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        


        <div className="relative z-20 text-center max-w-4xl px-6">
          <div className="animate-fade-in-up">
            {isClient ? (
              <SplitText
                text="Madow Honey"
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            ) : (
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Madow Honey 
              </h1>
            )}
            <p className="text-xl sm:text-2xl text-slate-100 mb-6 font-medium drop-shadow-lg">
              Madu Alami Premium dari Alam Terbaik Indonesia
            </p>
            <p className="text-lg text-slate-50 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Nikmati kelezatan murni yang dipanen langsung dari sarang lebah pilihan dengan kualitas terjamin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('products')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-2xl hover:bg-slate-700 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Lihat Produk Kami
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-slate-600 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/madu-02.jpg"
                  alt="Madow Honey - Madu premium berkualitas tinggi"
                  width={600}
                  height={400}
                  className="object-cover w-full h-96 group-hover:scale-105 transition-transform duration-300"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGN0VEIi8+CjxwYXRoIGQ9Ik0yNTAgMTUwSDM1MFYyNTBIMjUwVjE1MFoiIGZpbGw9IiNGNTlFMEIiLz4KPHN2Zz4K';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-300/50 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-300/30 rounded-full blur-xl"></div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold mb-6">
                  <span className="font-medium">Tentang Kami</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  Kualitas Premium,
                  <br />
                  <span className="text-slate-600">Rasa Autentik</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Madow Honey didirikan dengan tujuan menyediakan madu murni yang sehat, lezat, dan alami langsung dari peternak lebah terpercaya. Kami berkomitmen menjaga kualitas dan keaslian setiap tetes madu yang kami produksi.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                    <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollToSection('products')}
                className="inline-flex items-center px-6 py-3 bg-slate-600 text-white font-semibold rounded-full shadow-lg hover:bg-slate-700 transform hover:scale-105 transition-all duration-200"
              >
                Jelajahi Produk
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold mb-6">
              Produk Terbaik Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Koleksi Madu Premium
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Setiap produk kami dipilih dengan cermat untuk memberikan kualitas terbaik dan rasa yang autentik
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.img}
                    alt={`${product.name} - ${product.description}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-56 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGN0VEIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGNTlFMEIiLz4KPHN2Zz4K';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-600">
                      {product.price}
                    </span>
                    <button className="px-4 py-2 bg-slate-600 text-white rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors duration-200">
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold mb-6">
              🏆 Sertifikat & Penghargaan
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Kualitas Terjamin & Bersertifikat
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Madow Honey telah mendapatkan berbagai sertifikat dan penghargaan yang membuktikan kualitas dan keamanan produk kami
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sertifikat Halal",
                description: "Bersertifikat halal MUI untuk menjamin kehalalan produk",
                image: "/certificate-halal.jpg",
                badge: "MUI"
              },
              {
                title: "BPOM",
                description: "Terdaftar di BPOM dengan standar keamanan pangan",
                image: "/certificate-bpom.jpg",
                badge: "BPOM"
              },
              {
                title: "Organik",
                description: "Sertifikat organik untuk madu yang diproduksi secara alami",
                image: "/certificate-organic.jpg",
                badge: "ORGANIC"
              },
              {
                title: "ISO 22000",
                description: "Standar internasional untuk sistem manajemen keamanan pangan",
                image: "/certificate-iso.jpg",
                badge: "ISO"
              }
            ].map((cert, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGN0VEIi8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGNTlFMEIiLz4KPHN2Zz4K';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {cert.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-100 rounded-2xl">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800">Kualitas Terjamin</h4>
                <p className="text-sm text-slate-600">Semua produk telah melewati uji kualitas dan keamanan yang ketat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold mb-6">
              💬 Testimoni
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-slate-100"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="mb-4">
                    {renderStars(testi.rating)}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  {testi.text}
                </p>
                <h4 className="font-bold text-slate-700 text-lg">
                  {testi.name}
                </h4>
                <div className="text-slate-600 text-sm font-medium">
                  Pelanggan Setia
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-100 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/50 text-slate-800 rounded-full text-sm font-semibold mb-6">
            📞 Hubungi Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Mari Berkenalan!
          </h2>
          <p className="text-lg text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ingin memesan atau mengetahui lebih banyak tentang Madow Honey?
            Hubungi kami melalui WhatsApp atau email untuk konsultasi gratis!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">📱</span>
              Chat via WhatsApp
            </a>
            <a
              href="mailto:info@madowhoney.com"
              className="inline-flex items-center px-8 py-4 bg-slate-600 text-white font-semibold rounded-full shadow-lg hover:bg-slate-700 transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">✉️</span>
              Email Kami
            </a>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-semibold text-slate-800 mb-1">Alamat Toko</h3>
              <p className="text-slate-700 text-sm">Merempan Hulu, Siak</p>
            </div>
            <div className="p-6 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold text-slate-800 mb-1">Jam Operasional</h3>
              <p className="text-slate-700 text-sm">Senin - Sabtu: 08:00 - 20:00</p>
            </div>
            <div className="p-6 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold text-slate-800 mb-1">Free Delivery</h3>
              <p className="text-slate-700 text-sm">Minimal pembelian Rp 150.000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-300">
                  <Image
                    src="/logo.jpg"
                    alt="Madow Honey Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">Madow Honey</h3>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Menyediakan madu alami premium berkualitas tinggi langsung dari peternak lebah terpercaya di Indonesia.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/madowhoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@madowhoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-amber-800 rounded-full hover:bg-amber-700 transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-amber-800 rounded-full hover:bg-amber-700 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Menu</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Beranda', id: 'home' },
                  { name: 'Tentang', id: 'about' },
                  { name: 'Produk', id: 'products' },
                  { name: 'Sertifikat', id: 'certificates' },
                  { name: 'Testimoni', id: 'testimonials' },
                  { name: 'Kontak', id: 'contact' }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-amber-200 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <p className="text-amber-200 text-sm">Jl. Madu Manis No. 123</p>
                    <p className="text-amber-200 text-sm">Jakarta Selatan, 12345</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a href="tel:+628123456789" className="text-amber-200 hover:text-white transition-colors text-sm">
                    +62 812-3456-789
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a href="mailto:info@madowhoney.com" className="text-amber-200 hover:text-white transition-colors text-sm">
                    info@madowhoney.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-amber-200 text-sm">Senin - Sabtu: 08:00 - 20:00</p>
                </div>
              </div>
            </div>

            {/* Map Location */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Lokasi Kami</h4>
              <div className="bg-amber-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJl.%20Madu%20Manis%2C%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1635123456789!5m2!1sen!2sid"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-48"
                  title="Lokasi Madow Honey"
                ></iframe>
              </div>
              <div className="mt-3">
                <a
                  href="https://maps.google.com/?q=Jl.+Madu+Manis+No.+123,+Jakarta+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-300 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-amber-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-amber-200 text-sm">
                © {new Date().getFullYear()} Madow Honey. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="text-amber-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      
    </div>
  );
}