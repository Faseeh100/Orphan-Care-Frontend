'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Our Children', href: '/children' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    checkScroll();
    
    const handleScroll = () => {
      checkScroll();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-24 py-6 max-w-7xl z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-blue-900 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo - Left */}
            <div className="flex items-center space-x-2">
              <Heart className={`h-8 w-8 ${isScrolled ? 'text-white' : 'text-blue-900'}`} />
              <span className={`text-2xl font-bold ${isScrolled ? 'text-white' : 'text-blue-900'}`}>
                Orphan House
              </span>
            </div>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-blue-300 transition-colors ${
                    isScrolled ? 'text-white' : 'text-blue-900'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Donate Button - Right */}
            <div className="hidden lg:block">
              <Link
                href="/donate"
                className={`px-6 py-2.5 rounded-full font-semibold transition-all inline-block ${
                  isScrolled
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-blue-900'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-blue-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden ${isScrolled ? 'bg-blue-900' : 'bg-white shadow-lg'}`}>
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`py-2 font-medium ${
                      isScrolled ? 'text-white hover:text-blue-300' : 'text-blue-900 hover:text-blue-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  className={`mt-2 px-6 py-2.5 rounded-full font-semibold ${
                    isScrolled
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
}