import Image from 'next/image';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Message() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:px-2 md:mt-16">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl uppercase tracking-wider text-blue-600 font-semibold">
            Presidential Message
          </h2>
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mt-2">
            A Message from Our President
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Message */}
          <div className="w-full lg:w-1/2">
            <div className="p-6 md:p-8 md:px-12">
              <div className="text-gray-700 text-base md:text-md space-y-4">
                <p>Dear Friends and Supporters,</p>
                <p>
                  As the President of <span className="font-bold text-blue-700">Orphan Care</span>, 
                  I am deeply honored to lead an organization that has become a beacon 
                  of hope for hundreds of children who have lost their families.
                </p>
                <p>
                  Over the past 15 years, we have witnessed incredible transformations. 
                  Children who arrived at our doors with broken spirits have grown into 
                  confident, educated, and hopeful young adults. This transformation is 
                  made possible by the unwavering support of people like you.
                </p>
                <p className="pt-4">
                  Together, we are building a future where every orphaned child 
                  finds love, care, and opportunities to reach their full potential. 
                  Thank you for being part of this noble journey.
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <p className="font-bold text-gray-900">With sincere gratitude,</p>
                  <p className="text-blue-700 font-semibold">Dr. Sarah Johnson</p>
                  <p className="text-gray-600">President, Orphan Care Foundation</p>
                </div>
              </div>
              
              {/* Social Icons - MOVED HERE for mobile, shown on ALL screens */}
              <div className="mt-8 flex justify-center lg:hidden">
                <div className="flex gap-4">
                  <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors bg-blue-50 rounded-full p-3">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors bg-blue-50 rounded-full p-3">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors bg-blue-50 rounded-full p-3">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image Container - FIXED for mobile */}
            <div className="relative h-64 md:h-96 lg:h-125 w-full overflow-hidden rounded-xl">
              <Image
                src="/images/book.png"
                alt="President of Orphan Care"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            
            {/* Social Icons - DESKTOP only (hidden on mobile) */}
            <div className="hidden lg:flex absolute top-12 left-0 transform -translate-x-12 flex-col items-center gap-4 z-10">
              <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors bg-yellow-400 rounded-full p-3">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors bg-yellow-400 rounded-full p-3">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors bg-yellow-400 rounded-full p-3">
                <Linkedin size={24} />
              </a>
            </div>
            
            {/* Info Card - DESKTOP only (hidden on mobile) */}
            <div className="hidden lg:block absolute bottom-8 left-0 transform -translate-x-1/3 w-48 bg-white rounded-lg shadow-xl p-4 border border-gray-200 z-10">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
                  SJ
                </div>
                <h3 className="text-base font-bold text-gray-900">Dr. Sarah Johnson</h3>
                <p className="text-xs text-gray-600">President & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}