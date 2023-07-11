import React, { useState } from 'react'
import './HeroSection.css'
import {CiSearch} from 'react-icons/ci'
import ballimg from '../../assets/ballimg.png'
import { useDispatch } from 'react-redux'
import { FilteredClubPlayerApi } from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage'
import { CircularProgress } from '@mui/material'

const FilterHeroSection = () => {
  const [keyword, setKeyword] = useState('')
  const [loadSearch, setLoadSearch] = useState(false)
  const dispatch = useDispatch()

  const handleSearchPlayer = (e) =>{
    setKeyword(e.target.value)
  }

  const handleSubmitSearch = async (e) =>{
    e.preventDefault()
    let data = {}
    data.keyword = keyword  
    setLoadSearch(true)
    console.log(keyword)
    await dispatch(FilteredClubPlayerApi(data))
    setLoadSearch(false)
  }

  return (
    <div className='heroSection_Filterbackground'>
    <div className='heroSection_ContentSearchFilter' data-aos-easing='ease-in-out' data-aos-duration="1000" data-aos="fade-right">
        <form onSubmit={handleSubmitSearch} className='heroSection_FilterSearchitem'>
            <CiSearch className='heroSection_SearchIcon' />
            <input type='text' onChange={handleSearchPlayer} value={keyword} className='heroSection_SearchInput' placeholder='search for  players' />
            <button type='submit' className='heroSection_SearchButton'>
            {loadSearch ? <CircularProgress size={15} /> : <span>Search</span>}
            </button>
        </form>
    </div>
    <div className='heroSection_ImageFilterPage'>
    <img src={ballimg} className='footballImg_heroSection' data-aos="fade-left" data-aos-duration="1000" width='80px' height='80px' />
    </div>
    </div>
  )
}

export default FilterHeroSection