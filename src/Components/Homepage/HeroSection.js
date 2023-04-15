import React from 'react'
import './HeroSection.css'
import {CiSearch} from 'react-icons/ci'
import footballer from '../../assets/footballerHero.png'

const HeroSection = () => {
  return (
    <div className='heroSection_background'>
        <div className='heroSection_Contentword'>
            <p className='heroSection_ContentTopic'>THE BEST AND BRIGHTEST AFRICAN FOOTBALL TALENT</p>
            <p className='heroSection_ContentWords'>Enquire about talent/manager and contact them instantly.</p>
            <div className='heroSection_Searchitem'>
                <CiSearch className='heroSection_SearchIcon' />
                <input type='text' className='heroSection_SearchInput' placeholder='search for club or players' />
                <button className='heroSection_SearchButton'>Search</button>
            </div>
        </div>
        <img src={footballer} className='heroSection_ImageFootballer' />
        </div>
  )
}

export default HeroSection