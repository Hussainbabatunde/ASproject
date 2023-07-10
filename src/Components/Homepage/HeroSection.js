import React, { useState } from 'react'
import './HeroSection.css'
import {CiSearch} from 'react-icons/ci'
import footballer from '../../assets/footballerHero.png'
import { FilteredClubPlayerApi } from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage'
import { useDispatch } from 'react-redux'
import { useNavigate, useNavigation } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const HeroSection = () => {
  const dispatch= useDispatch()
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const OnchangeSearchPlayer = (e) =>{
    setData(e.target.value)
  }
  const navigation = useNavigate()
  const handleSearchPlayer = () =>{
    setLoading(true)
    dispatch(FilteredClubPlayerApi(data))
    setLoading(false)
    navigation('/filterPage')
  }

  return (
    <div className='heroSection_background'>
        <div className='heroSection_Contentword' data-aos-easing='ease-in-out' data-aos-duration="1000" data-aos="fade-right">
            <p className='heroSection_ContentTopic'>THE BEST AND BRIGHTEST AFRICAN FOOTBALL TALENT</p>
            <p className='heroSection_ContentWords'>Enquire about talent/manager and contact them instantly.</p>
            <form onSubmit={handleSearchPlayer} className='heroSection_Searchitem'>
                <CiSearch className='heroSection_SearchIcon' />
                <input type='text' value={data} onChange={OnchangeSearchPlayer} className='heroSection_SearchInput' placeholder='search for club or players' />
                {loading? 
                <button type='submit' className='heroSection_SearchButton'><CircularProgress size={15} /></button>
                :<button type='submit' className='heroSection_SearchButton'>Search</button>}
            </form>
        </div>
        <img src={footballer} data-aos="fade-left" data-aos-duration="1000" className='heroSection_ImageFootballer' />
        </div>
  )
}

export default HeroSection