
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from "../assets/frontend_assets/assets"
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext)
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description') // Add state for active tab

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        console.log(item);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={() => setImage(item)} />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>

        </div>

        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className=' w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="" className='w-3.5' />
            <p className='pl-2'>{122}</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ""}`} onClick={() => setSize(item)}>{item}</button>
              ))}
            </div>
          </div>

          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => {
              addToCart(productData._id, size);
              navigate('/cart');
            }}
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>

      {/* Description and Review Section */}
      <div className='mt-20'>

        <div className='flex'>
          <button
            className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'bg-gray-100 font-bold' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-100 font-bold' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (122)
          </button>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          {activeTab === 'description' ? (
            <div>
              {productData.specificationDescription ? (
                <div className='whitespace-pre-line'>
                  {productData.specificationDescription}
                </div>
              ) : (
                <p>No specifications available for this product.</p>
              )}
            </div>
          ) : (
            <div>
              <p>Customer reviews will be displayed here.</p>
              <p>This product has received positive feedback from customers.</p>
            </div>
          )}
        </div>

      </div>

      {/* display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product