import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import HeroSection from '../../Components/Homepage/HeroSection'
import './Homepage.css';
import Player1 from '../../assets/Player1.png'
import Player2 from '../../assets/Player2.png'
import Player3 from '../../assets/Player3.png'
import Player4 from '../../assets/Player4.png'
import DownSort from '../../assets/DownSort.png'
import FootballerInfo from '../../Components/Homepage/FootballerInfo';
import { Link } from 'react-router-dom';
import {RxDotFilled} from 'react-icons/rx';
import Footer from '../../Components/Homepage/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from "react-spinners";
import { GetPlayersApi, GetRecommendedApi } from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage';

const HomePage = () => {

  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
      const getPlayerDataHome = async () =>{
        setLoader(true)
        await dispatch(GetPlayersApi())
        await dispatch(GetRecommendedApi())
        setLoader(false)
      }
      getPlayerDataHome()
  },[])
  const data = [
    // {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
    // {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
    // {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
    // {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'}
  ]
  
  // const Sortdata = [
  //   {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
  //   {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
  //   {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
  //   {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'},
  //   {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
  //   {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
  //   {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
  //   {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'}
  // ]
  const Sortdata = useSelector((state)=> state.reducer?.GetPlayerSlice?.gottenPlayerData?.data)
  const Recommendeddata = useSelector((state)=> state.reducer?.GetPlayerSlice?.recommendedPlayersData?.data)
  const PositionSort = ['GoalKeeper', 'Center backs(Defender)', 'Fullbacks (Defender)', 'Center midfielders', 'Attacking midfielders', 'Defensive midfielders', 'Wingers', 'Strikers']
  console.log('Sortdata ', Recommendeddata)

  return (
    <div>
        <Header/>
        <div className='Homepage_contents'>
            <HeroSection />
            {loader? 
            <div className="flex justify-center align-items-center mt-7">
              <ClockLoader
                                  color="#7F351D"
                                  size={45}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
            </div>
            :
            <>
            <FootballerInfo title='TOP RATED TALENTS' pathTitle='' data={data} />
            <FootballerInfo title='RECOMMENDED' pathTitle='/recommendedPage' data={Recommendeddata} />
            </>}
            <div className='Homepage_topTalents'>
            <p className='Homepage_topTalentsTopic'>EXPLORE TALENT</p>
            
            <Link to='/filterPage' className='Homepage_topTalentsTopic'>VIEW ALL</Link>
            </div>
            <div className='Homepage_SortCategory'>
              <div className="InnerHomeFilter_Screen">
              {PositionSort.map((each, index)=>(
                <Link to='/filterPage' className='Homepage_SortPosition' key={index}>{each}</Link>
            ))}
            </div>
            </div>
            {loader? 
            <div className="flex justify-center align-items-center mt-7">
              <ClockLoader
                                  color="#7F351D"
                                  size={45}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
            </div>
            :
            <div className='Homepage_Sortfootballers'>
            {Sortdata?.map((each, index)=>( 
             <Link to={`/viewplayerprofile/${each?.user_id}`}
              data-aos-easing='ease-in-out' 
             data-aos-duration="1000" 
             data-aos="flip-down"
             className='Homepage_foorballersBriefInfo' key={index}>
                <img src={each?.image_url} className='Homepage_PlayersImage' />
                {
                  each?.service_type == 'open' || each?.price?.service_type == 'open'?<p className='Homepage_PlayerStatus'>{each?.minimum || each?.price?.minimum}</p>
                  : each?.service_type == 'free' || each?.price?.service_type == 'free' ? <p className='Homepage_PlayerStatus'>{each?.minimum || each?.price?.minimum}</p> 
                  : each?.service_type == 'actual' || each?.price?.service_type == 'actual'? <p className='Homepage_PlayerStatus'>${each?.minimum || each?.price?.minimum}</p>
                  : <p className='Homepage_PlayerStatus'>${each?.minimum || each?.price?.minimum} - ${each?.maximum || each?.price?.maximum}</p>
                  }
                <p className='Homepage_PlayersName'>{each?.firstname} {each?.surname}</p>
                <div className='Homepage_playersPosition'>
                  <p>{each?.position.replace(/_/g, ' ')}</p>
                  <RxDotFilled />
                  <p>{each?.current_club}</p>
                </div>
              </Link>))}
              
            </div>
}
        </div>
            <Footer />
    </div>
  )
}

export default HomePage