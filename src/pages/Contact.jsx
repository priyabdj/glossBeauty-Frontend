import React from 'react'
import Title from '../components/Title';
import {assets} from "../assets/frontend_assets/assets"
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className='pb-14'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Hygex Station <br /> suite345,Mumbai,Maharshtra</p>
          <p className='text-gray-500'><span className='font-semibold'>Tel:</span><span>(91) 557-2346</span> <br /><span className='font-semibold'>Email:</span> <span>admin@glamora.com</span>a</p>
          
          <p className='font-semibold text-xl text-gray-600'>Careers at gloss garden</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className=' border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact