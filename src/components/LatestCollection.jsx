import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestProducts(sorted.slice(0, 8));
  }, [products]);

  return (
    <div className="my-12 px-4 sm:px-6 md:px-12 lg:px-20">
    
      <div className="text-center py-10">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base lg:text-lg text-gray-600 mt-3 font-medium  ">
         Shop the freshest arrivals designed to elevate your beauty routine with style.
        </p>
      </div>

  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12">
        {latestProducts.map((item, index) => (
          <div key={item._id || index} className=" font-semibold">
            <ProductItem 
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
