'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Info() {
  const children = [
    { 
      id: 1, 
      src: '/images/book.png', 
      name: 'Aarav', 
      age: 8, 
      story: 'Help us in',
      hobbies: 'Painting, Reading, Football'
    },
    { 
      id: 2, 
      src: '/images/cabbage.jpg', 
      name: 'Priya', 
      age: 6, 
      story: 'educating kids',
      hobbies: 'Dancing, Singing, Drawing'
    },
    { 
      id: 3, 
      src: '/images/e1.jpg', 
      name: 'Rohan', 
      age: 9, 
      story: 'as well as learning',
      hobbies: 'Math puzzles, Science experiments, Chess'
    },
    { 
      id: 4, 
      src: '/images/frame.png', 
      name: 'Anaya', 
      age: 7, 
      story: 'so do not waste time',
      hobbies: 'Animal care, Gardening, Storytelling'
    },
    { 
      id: 5, 
      src: '/images/conference.png', 
      name: 'Donate Now', 
      age: 10, 
      story: 'Donate Now',
      hobbies: 'Teaching, Cricket, Music'
    },
    { 
      id: 6, 
      src: '/images/email.png',
      name: 'So Child could benefit', 
      age: 5, 
      story: 'So Child could benefit',
      hobbies: 'Playing with dolls, Listening to stories, Coloring'
    },
  ];

  const backgroundImages = [
    '/images/analytics2.png',
    '/images/analytics3.png',
    '/images/basic.png',
    '/images/header.png',
    '/images/henry.png',
    '/images/billing.png',
  ];

  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const currentChild = children[currentChildIndex];

  useEffect(() => {
    const childInterval = setInterval(() => {
      setCurrentChildIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, 4000);

    return () => clearInterval(childInterval);
  }, [children.length]);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(bgInterval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen max-w-7xl relative overflow-hidden">
      
      {/* Background Image Slideshow - Changed from fixed to absolute within container */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt="Background"
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Side - About Content */}
        <div className="lg:w-1/2 backdrop-blur-sm p-8 md:px-12 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Orphan Care</span>
            </h1>
            
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                At <span className="font-semibold text-blue-700">Orphan Care</span>, 
                we believe every child deserves love, security, and opportunities 
                to thrive. Our mission is to provide orphaned children with a 
                nurturing environment where they can heal, grow, and dream.
              </p>
              
              <div className="bg-blue-50/80 p-6 rounded-xl my-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-3">
                  Our Promise to Every Child
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    A safe and loving home environment
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Quality education and skill development
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Complete healthcare and nutrition
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Emotional support and counseling
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Opportunities for recreation and creativity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Child Image with Auto-change */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 backdrop-blur-sm bg-white/10">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-full animate-pulse blur-lg opacity-50"></div>
            
            <div className="relative w-60 h-60 md:w-72 md:h-72 mx-auto mt-2">
              <div className="w-full h-full rounded-full overflow-hidden border-8 border-white/80 shadow-2xl">
                <Image
                  src={currentChild.src}
                  alt={currentChild.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 backdrop-blur-sm rounded-2xl p-6 max-w-md shadow-2xl">
            <div className="mb-4">
              <p className="text-gray-700 font-bold text-center">{currentChild.story}</p>
            </div>
            
            <div className="flex justify-center space-x-2 mt-4">
              {children.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentChildIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentChildIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`View ${children[index].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}