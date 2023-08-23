import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FaHome, FaSearch, FaUser, FaSignOutAlt, FaSignInAlt,FaPen } from 'react-icons/fa';
const Navbar = () => {
  const isLoggedIn = false; 
  const isAdmin = false;

  return (
    <nav className=" p-4 bg-black min-h-screen  ">
      <div className="sticky top-10 ">
        
            <div className="text-white text-xl font-semibold mb-5">Student Book Marketplace</div>
       
      
        <div className="space-y-10">
          <div className="hover:bg-gray-600 py-2 px-10 rounded-lg" >
            <Link href="/">
              <div className="text-white relative flex items-center text-[20px]  gap-10"> <FaHome className="text-[25px] " /><span className="absolute left-10 ">Home</span> </div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 px-10 rounded-lg">
            <Link href="/search">
              <div className="text-white relative flex items-center text-[20px]  gap-10"><FaSearch /><span className="absolute left-10 ">Search</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 px-10 rounded-lg">
            <Link href="/createnewpost">
              <div className="text-white relative flex items-center text-[20px]  gap-10"><FaPen /><span className="absolute left-10 ">Create</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 px-10 rounded-lg">
            <Link href="/profile">
              <div className="text-white relative flex items-center text-[20px]  gap-10"><FaUser className="text-white"/><span className="absolute left-10 ">Profile</span></div>
            </Link>
          </div>
          <div className="hover:bg-gray-600 py-2 px-10 rounded-lg">
            <Link href="/login">
              <div className="text-white relative flex items-center text-[20px]  gap-10">
              {isLoggedIn ? <><FaSignOutAlt /> <span className="absolute left-10 ">Logout</span></> : <><FaSignInAlt /><span className="absolute left-10 ">Login</span></>}
          
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
