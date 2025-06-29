

import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-4 sm:px-6 md:px-10 lg:px-16 py-10 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div className="col-span-1 md:col-span-2">
          <img src={assets.glossBeauty} alt="Gloss Beauty Logo" className="w-36 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            Gloss Beauty products bring bold elegance to your wardrobe. From bodycon dresses to chic essentials, we redefine style. Step into the spotlight — “associated with lip gloss, glowing skin, or shiny hair.”
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact & Address */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Phone:</strong> 7303105119</li>
              <li className="break-all"><strong>Email:</strong> contact@glossBeauty.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Unit-113, Malabar Hill<br />
              Maharashtra - 400006
            </p>
          </div>
        </div>
      </div>

      <hr className="mt-10 mb-5 border-gray-300" />

      <p className="text-center text-sm text-gray-500">
        © 2025 Gloss Beauty — All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
