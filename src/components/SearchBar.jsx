import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

const SearchBar = ({ onClose }) => {
  const { search, setSearch } = useContext(ShopContext);

  return (
    <div className="w-full bg-gray-50 px-4 py-5 sm:px-12 border-b">
      <div className="relative max-w-4xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full pl-5 pr-14 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black placeholder:text-sm"
        />
        <img
          src={assets.cross_icon}
          alt="close"
          className="absolute right-4 top-2.5 w-4 h-4 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default SearchBar;
