import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null); 
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
      setUser({ email: userEmail, name: userEmail.split('@')[0] });
    } else {
      // If not logged in via localStorage, ensure user state is null
      setUser(null);
      
      // Only make API call if we don't have localStorage data
      axiosInstance.get("/auth/profile")
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            setUser(null);
          }
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, [location.pathname]);

  const isUserLoggedIn = () => {
    return user && localStorage.getItem('isLoggedIn') === 'true';
  };

  const handleLogout = async () => {
    // Immediately clear user state to hide logout UI
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.clear();
    
    try {
      await axiosInstance.get("/auth/logout");
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      navigate("/login", { state: { fromLogout: true }, replace: true });
    }
  };

  return (
    <div className="flex items-center justify-between py-10 font-medium relative z-50 bg-white">
      {/* Logo */}
      <img src={assets.glossBeauty} alt="logo" className="w-28 sm:w-36 md:w-40" />

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-black" : ""}`}>
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-black" : ""}`}>
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-black" : ""}`}>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-black" : ""}`}>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
       <img
  src={assets.search_icon}
  onClick={() => {
    navigate("/collection"); 
    setShowSearch(true);    
  }}
  alt="search"
  className="w-5 sm:w-5 cursor-pointer"
/>

        {/* Profile Dropdown */}
        {isUserLoggedIn() ? (
          <div className="group relative">
            <img src={assets.profile_icon} alt="profile" className="w-5 sm:w-5 cursor-pointer" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link to="/orders" className="hover:text-black">Orders</Link>
                <p className="cursor-pointer hover:text-black" onClick={handleLogout}>LogOut</p>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <img src={assets.profile_icon} alt="login" className="w-5 sm:w-5 cursor-pointer" />
          </Link>
        )}

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 sm:w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          src={assets.menu_icon}
          className="w-6 sm:w-5 cursor-pointer sm:hidden"
          alt="menu"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar for Small Screens */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ease-in-out z-40 ${visible ? "w-full" : "w-0"} overflow-hidden`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} alt="back" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink to="/" className="py-2 pl-6 border" onClick={() => setVisible(false)}>HOME</NavLink>
          <NavLink to="/collection" className="py-2 pl-6 border" onClick={() => setVisible(false)}>COLLECTION</NavLink>
          <NavLink to="/about" className="py-2 pl-6 border" onClick={() => setVisible(false)}>ABOUT</NavLink>
          <NavLink to="/contact" className="py-2 pl-6 border" onClick={() => setVisible(false)}>CONTACT</NavLink>
          
          {/* Mobile Profile Section */}
          {isUserLoggedIn() ? (
            <>
              <NavLink to="/orders" className="py-2 pl-6 border" onClick={() => setVisible(false)}>ORDERS</NavLink>
              <div 
                className="py-2 pl-6 border cursor-pointer hover:bg-gray-100" 
                onClick={() => {
                  setVisible(false);
                  handleLogout();
                }}
              >
                LOGOUT
              </div>
            </>
          ) : (
            <NavLink to="/login" className="py-2 pl-6 border" onClick={() => setVisible(false)}>LOGIN</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;