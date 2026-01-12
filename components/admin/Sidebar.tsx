// 'use client';

// import { LayoutDashboard, Shield, LogOut, Heart, BookImage, User } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface SidebarProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
//   const router = useRouter();

//   // Menu items array
//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: <LayoutDashboard className="w-5 h-5" />,
//       href: '/admin'
//     },
//     {
//       id: 'programs',
//       label: 'Programs',
//       icon: <Heart className="w-5 h-5" />,
//       href: '/admin/programs'
//     },
//     {
//       id: 'services',
//       label: 'Services',
//       icon: <Shield className="w-5 h-5" />,
//       href: '/admin/services'
//     },
//     {
//       id: 'gallery',
//       label: 'Gallery',
//       icon: <BookImage className="w-5 h-5" />,
//       href: '/admin/gallery'
//     },
//     {
//       id: 'users',
//       label: 'Users',
//       icon: <User className="w-5 h-5" />,
//       href: '/admin/users'
//     }
//   ];

//   const handleLogout = () => {
//   // Clear all authentication data
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
  
//   // Clear any cookies if you set them
//   document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
//   router.push('/login');
//   window.location.reload();
// };

//   const navigateTo = (tab: string, path: string) => {
//     setActiveTab(tab);
//     router.push(path);
//   };

//   return (
//     <div className="fixed left-0 top-0 bottom-0 w-64 bg-linear-to-b from-blue-900 to-blue-800 text-white h-screen overflow-y-auto">
//       <div className="p-6 h-full flex flex-col">
//         {/* Logo */}
//         <div className="flex items-center space-x-3 mb-10">
//           <Heart className="w-8 h-8 text-red-300" fill="currentColor" />
//           <div>
//             <h2 className="text-xl font-bold">Orphan Care</h2>
//             <p className="text-blue-200 text-xs">Admin Panel</p>
//           </div>
//         </div>

//         {/* Navigation - Using .map() */}
//         <nav className="space-y-2 flex-1">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => navigateTo(item.id, item.href)}
//               className={`w-full flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-lg 
//                 transition-all ${
//                 activeTab === item.id
//                   ? 'bg-white/20 text-white'
//                   : 'hover:bg-white/10 text-blue-100'
//               }`}
//             >
//               {item.icon}
//               <span className="font-medium cursor-pointer">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Logout Button */}
//         <div className="pt-6 border-t border-blue-700 mt-auto">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
//           >
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium cursor-pointer">Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





'use client';

import { LayoutDashboard, Shield, LogOut, Heart, BookImage, User, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/admin'
    },
    {
      id: 'programs',
      label: 'Programs',
      icon: <Heart className="w-5 h-5" />,
      href: '/admin/programs'
    },
    {
      id: 'services',
      label: 'Services',
      icon: <Shield className="w-5 h-5" />,
      href: '/admin/services'
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: <BookImage className="w-5 h-5" />,
      href: '/admin/gallery'
    },
    {
      id: 'users',
      label: 'Users',
      icon: <User className="w-5 h-5" />,
      href: '/admin/users'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
    window.location.reload();
  };

  const navigateTo = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 bottom-0 w-64 bg-linear-to-b from-blue-900 to-blue-800 
        text-white h-screen overflow-y-auto z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-10">
            <Heart className="w-8 h-8 text-red-300" fill="currentColor" />
            <div>
              <h2 className="text-xl font-bold">Orphan Care</h2>
              <p className="text-blue-200 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id, item.href)}
                className={`w-full flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-lg 
                  transition-all ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-blue-100'
                }`}
              >
                {item.icon}
                <span className="font-medium cursor-pointer">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="pt-6 border-t border-blue-700 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium cursor-pointer">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}