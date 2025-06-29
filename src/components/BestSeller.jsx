import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
   
 const bestProduct = products.filter((item)=>(item.bestseller));
 setBestSeller(bestProduct.slice(0,5))
  
  }, []);
  //w-3/4 m-auto text-xs sm:text-base text-gray-600

  return (
    <div className='my-10'>
      {/* Section Title */}
      <div className='text-center text-3xl py-8'>
        <Title text1='BEST' text2='SELLERS' />
        <p className='w-3/4 lg:w-2/3 mx-auto text-sm  lg:text-lg text-gray-600 mt-3 font-medium '>
          Our most-loved products, trusted by thousands of happy customers.
        </p>
      </div>

      {/* Product Grid or Fallback */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4'>
       {
  bestSeller.map((item, index) => (
    <div key={item._id || index} className="text-base font-semibold">
      <ProductItem 
        id={item._id} 
        name={item.name} 
        image={item.image} 
        price={item.price} 
      />
    </div>
  ))
}

      </div>
    </div>
  );
};

export default BestSeller;
