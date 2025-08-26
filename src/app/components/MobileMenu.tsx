'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  // Close menu when clicking outside
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  const menuItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'products', label: 'Produk' },
    { id: 'certificates', label: 'Sertifikat' },
    { id: 'testimonials', label: 'Testimoni' },
    { id: 'contact', label: 'Kontak' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/madowhoney',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      url: 'https://tiktok.com/@madowhoney',
      color: 'bg-black'
    },
    {
      name: 'WhatsApp',
      icon: '📱',
      url: 'https://wa.me/628123456789',
      color: 'bg-green-500'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" />
      
      {/* Mobile Menu */}
      <div className="mobile-menu-container fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
                <Image
                  src="/logo.jpg"
                  alt="Madow Honey Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Madow Honey</h2>
                <p className="text-xs text-slate-600">Madu Premium</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-slate-100 text-slate-700 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  <span className="text-base">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="border-t border-slate-100 p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Ikuti Kami</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 p-6">
            <div className="text-center">
              <p className="text-sm text-slate-700 mb-2">Hubungi Kami</p>
              <a
                href="https://wa.me/628123456789"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-full text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                <span>📱</span>
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
