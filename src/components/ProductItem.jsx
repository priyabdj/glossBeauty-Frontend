import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer block"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded w-full aspect-[3/4] sm:aspect-[1/1]">
        <img
          src={Array.isArray(image) ? image[0] : image || '/placeholder.png'}
          alt={name || 'Product Image'}
          className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <p className="pt-3 pb-1 text-lg font-semibold truncate">{name || 'Unnamed Product'}</p>
      <p className="text-base font-medium">
        {currency || '₹'}
        {price?.toFixed(2) || '0.00'}
      </p>
    </Link>
  );
};

export default ProductItem;
