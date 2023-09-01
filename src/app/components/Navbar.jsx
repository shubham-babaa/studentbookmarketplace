import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FaHome, FaSearch, FaUser, FaSignOutAlt, FaSignInAlt,FaPen } from 'react-icons/fa';
const Navbar = () => {
  const isLoggedIn = false; 
  const isAdmin = false;

  return (
    <nav className=" p-4 bg-black min-h-screen  md:w-[500px] ">
      <div className=" sticky top-10">
        
            <div className="text-white text-xl font-semibold mb-5 hidden md:block "> Book Marketplace</div>
      
        <div className="space-y-10">
          <div className="hover:bg-gray-600 py-2 md:px-10  rounded-lg" >
            <Link href="/">
              <div className="text-white relative flex items-center text-[20px]  sm:gap-10"> <FaHome className="text-[25px] " /><span className="absolute left-10 hidden md:block ">Home</span> </div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 md:px-10 rounded-lg">
            <Link href="/search">
              <div className="text-white relative flex items-center text-[20px] sm:gap-10"><FaSearch className="text-[25px] " /><span className="absolute left-10 hidden md:block">Search</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 md:px-10 rounded-lg">
            <Link href="/createnewpost">
              <div className="text-white relative flex items-center text-[20px] sm:gap-10"><FaPen  className="text-[25px] "/><span className="absolute left-10 hidden md:block">Create</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 md:px-10 rounded-lg">
            <Link href="/profile">
              <div className="text-white relative flex items-center text-[20px]  sm:gap-10"><FaUser className="text-white text-[25px]"/><span className="absolute left-10 hidden md:block">Profile</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 md:px-10 rounded-lg">
            <Link href="/login">
              <div className="text-white relative flex items-center text-[20px]  sm:gap-10">
              {isLoggedIn ? <><FaSignOutAlt  className="text-white text-[25px]"/> <span className="absolute left-10 hidden sm:block">Logout</span></> : <><FaSignInAlt  className="text-white text-[25px]" /><span className="absolute left-10 hidden md:block">Login</span></>}
          
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
