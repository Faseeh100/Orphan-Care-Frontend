import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="max-w-7xl bg-linear-to-br from-blue-900 to-gray-900 text-white">
      {/* Main Footer Content - Reduced height */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Logo & About Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-400" fill="currentColor" />
              <div>
                <h2 className="text-2xl font-bold">Orphan Care</h2>
                <p className="text-blue-200 text-sm">Giving Hope to Every Child</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              We are dedicated to providing love, care, and opportunities for orphaned 
              children to thrive and build brighter futures.
            </p>
            
            {/* Contact Info - Compact */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span className="text-gray-300 text-sm">123 Hope Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span className="text-gray-300 text-sm">info@orphancare.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Home</a>
              <a href="/about" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">About Us</a>
              <a href="/services" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Services</a>
              <a href="/children" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Our Children</a>
            </div>
          </div>

          {/* Quick Links Section 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">More Links</h3>
            <div className="space-y-2">
              <a href="/gallery" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Gallery</a>
              <a href="/news" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">News & Events</a>
              <a href="/volunteer" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Volunteer</a>
              <a href="/contact" className="block text-gray-300 hover:text-white text-sm transition hover:translate-x-1">Contact</a>
            </div>
            
            {/* Social Media - Smaller */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Reduced padding */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Orphan Care Foundation. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-xs transition">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-xs transition">Terms</a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-xs transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}