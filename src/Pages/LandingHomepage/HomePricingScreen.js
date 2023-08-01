import React from 'react'
import './Homepage.css'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Homepage/Footer'
import { Link } from 'react-router-dom'

const HomePricingScreen = () => {
  return (
    <div>
        <div className="max-w-[1400px] mx-auto shadow-lg">
      <Header />
      {/* <div className="Homepage_contents"> */}
      <div className='Homepricingpage_section flex flex-col lg:flex-row min-h-[90vh] px-[2rem] md:px-[8rem] items-center justify-between'>
        <div className='mt-5'>
            <p className='text-[#1C8C53]'>Get To Know Players Pricing Offers</p>
            <p className='text-3xl md:text-5xl font-bold text-[#071A10] mt-2'>Great Talents At</p>
            <p className='text-3xl md:text-5xl font-bold text-[#071A10]'>Affordable Price</p>
            <p className='w-[100%] md:w-[450px] mt-6'>Scouts should be able to make payment for Talent Acquisition Cost - When a scout pays for a player, Talent Manager and Platform should share the profit in a percentage share of 80% - 20% (Talent Manager 80%, Platform 20%)</p>
            <Link to='/signup' className='SignupHomepage_pricing'>Signup</Link>
        </div>
        <div>
          <div className='pricingPage_priceCategory p-[10px] md:p-[20px] w-[100%] md:w-[450px] mt-3'>
            <p className='text-xl font-bold'>Free player</p>
            <p className='mt-2 text-sm text-[#5C5C64]'>The platform takes commission for processing FREE
players valuation </p>
          </div>
          <div className='pricingPage_priceCategory p-[10px] md:p-[20px] w-[100%] md:w-[450px] mt-3'>
            <p className='text-xl font-bold'>Open</p>
            <p className='mt-2 text-sm text-[#5C5C64]'>Company evaluates the player and fix and amount</p>
          </div>
          <div className='pricingPage_priceCategory p-[10px] md:p-[20px] w-[100%] md:w-[450px] mt-3'>
            <p className='text-xl font-bold'>Range</p>
            <p className='mt-2 text-sm text-[#5C5C64]'>Player State their price range. Open for negotiation</p>
          </div>
          <div className='pricingPage_priceCategory p-[10px] md:p-[20px] w-[100%] md:w-[450px] mt-3 mb-3 md:mb-0'>
            <p className='text-xl font-bold '>Actual</p>
            <p className='mt-2 text-sm text-[#5C5C64]'>For players who have an established worth. They state their price, not open to negotiation.</p>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  )
}

export default HomePricingScreen