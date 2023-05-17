import React from 'react'
import './HeroSection.css'
import {CiSearch} from 'react-icons/ci'
import ballimg from '../../assets/ballimg.png'

const FilterHeroSection = () => {
  return (
    <div className='heroSection_Filterbackground'>
    <div className='heroSection_ContentSearchFilter' data-aos-easing='ease-in-out' data-aos-duration="1000" data-aos="fade-right">
        <div className='heroSection_FilterSearchitem'>
            <CiSearch className='heroSection_SearchIcon' />
            <input type='text' className='heroSection_SearchInput' placeholder='search for club or players' />
            <button className='heroSection_SearchButton'>Search</button>
        </div>
    </div>
    <div className='heroSection_ImageFilterPage'>
    <img src={ballimg} data-aos="fade-left" data-aos-duration="1000" width='80px' height='80px' />
    </div>
    </div>
  )
}

export default FilterHeroSection