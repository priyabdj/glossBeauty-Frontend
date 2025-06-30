import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);


  const handleCheckout = () => {
    console.log(" Checkout button clicked");
    
  
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (isLoggedIn && userEmail) {
      console.log(" User is logged in, proceeding to checkout:", userEmail);
      navigate('/place-order');
    } else {
      console.log(" User not logged in, redirecting to login");
     
      localStorage.setItem('redirectAfterLogin', '/place-order');
     
      navigate('/login');
    }
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-8 lg:px-16">
     
      <div className="text-2xl mb-6">
        <Title text1={'Your'} text2={'CART'} />
      </div>

      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
             
              <div className="flex gap-4 items-start sm:items-center">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20 rounded object-cover"
                  alt={productData.name}
                />

                <div>
                  <p className="text-sm sm:text-base font-medium mb-1">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-4 text-sm mt-1">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 py-1 border text-xs sm:text-sm bg-slate-100 rounded">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

          
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="border w-14 sm:w-20 px-2 py-1 text-center"
                  min={1}
                />

                <img
                  src={assets.bin_icon}
                  className="w-4 sm:w-5 cursor-pointer"
                  alt="Delete"
                  onClick={() => updateQuantity(item._id, item.size)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total + Checkout Button */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleCheckout}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;