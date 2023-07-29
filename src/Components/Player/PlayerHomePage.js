import React, { useEffect, useState } from 'react'
import '../../Pages/LandingHomepage/Homepage.css';
import Player1 from '../../assets/Player1.png'
import Player2 from '../../assets/Player2.png'
import Player3 from '../../assets/Player3.png'
import Player4 from '../../assets/Player4.png'
import DownSort from '../../assets/DownSort.png'
import { Link } from 'react-router-dom';
import {RxDotFilled} from 'react-icons/rx';
import { ClockLoader, ScaleLoader } from "react-spinners";
import ScoutHeader from '../Header/ScoutHeader';
import HeroSection from '../Homepage/HeroSection';
import FootballerInfo from '../Homepage/FootballerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { GetPlayersApi, GetRecommendedApi, GetTopRatedPlayersApi } from '../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage';
import { GetMarketPriceApi } from '../../Slice/Player/PlayerPayment/PaymentSlice';
import {GrLocation} from 'react-icons/gr'
import {PiBarbellDuotone} from 'react-icons/pi'
import {PiPersonArmsSpreadBold} from 'react-icons/pi'

const PlayerHomePage = () => {

  const dispatch = useDispatch()
  const [Recommendeddata, setRecommendeddata] = useState(null)
  const [loader, setLoader] = useState(false)
  const [TopratedPlayersdata, setTopRatedPlayesdata] = useState(null);
  const [AllPlayersdata, setAllPlayersdata] = useState(null);

  useEffect(()=>{
      const getPlayerDataHome = async () =>{
        setLoader(true)
        await dispatch(GetPlayersApi())
        await dispatch(GetRecommendedApi())
        await dispatch(GetTopRatedPlayersApi());
        await dispatch(GetMarketPriceApi())
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
      const GottenRecommendeddata = useSelector((state)=> state.reducer?.GetPlayerSlice?.recommendedPlayersData?.data)
      const GottenTopRatedPlayersdata = useSelector(
        (state) => state.reducer?.GetPlayerSlice?.topRatedPlayersData?.data
      );


      useEffect(()=>{
        const initial = () =>{
          const endIndex = 4;
          const slicedArray = endIndex <= GottenRecommendeddata?.length ? GottenRecommendeddata.slice(0, endIndex) : GottenRecommendeddata;
          setRecommendeddata(slicedArray)
        }
        initial()
      },[GottenRecommendeddata])

      useEffect(() => {
        const initial = () => {
          const endIndex = 4;
          const slicedArray = endIndex <= GottenTopRatedPlayersdata?.length ? GottenTopRatedPlayersdata.slice(0, endIndex) : GottenTopRatedPlayersdata;
          setTopRatedPlayesdata(slicedArray)
        }
        initial()
      },[GottenTopRatedPlayersdata])

      function shortenName(name, secname, maxLength) {
        let x = name + " " + secname;
        if (x.length <= maxLength) {
          return x;
        } else {
          return x.substring(0, maxLength) + ".....";
        }
      }
      
      // const fullName = AllPlayersdata?.firstname + " " + AllPlayersdata?.surname;
      const maxLength = 16; // Set the maximum length for the shortened name
      

      useEffect(() => {
        const initial = () => {
          const endIndex = 8;
          const slicedArray = endIndex <= Sortdata?.length ? Sortdata.slice(0, endIndex) : Sortdata;
          setAllPlayersdata(slicedArray)
        }
        initial()
      },[Sortdata])
      // console.log(Recommendeddata)
      const PositionSort = ['GoalKeeper', 'Center backs(Defender)', 'Fullbacks (Defender)', 'Center midfielders', 'Attacking midfielders', 'Defensive midfielders', 'Wingers', 'Strikers']

  return (
    <div>
        {/* <ScoutHeader /> */}
        <div className='Homepage_contents'>
            <HeroSection />
            {loader? 
            <div className="flex justify-center align-items-center mt-7">
              <ScaleLoader
                                  color="#58DC53"
                                  size={25}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
            </div>
            :
            <>
            <FootballerInfo title='TOP RATED TALENTS' pathTitle='/filterPage' data={TopratedPlayersdata} />
            <FootballerInfo title='RECOMMENDED' pathTitle='/recommendedPage' data={Recommendeddata} />
            </>
}
<div className='HomePage_talentsSection px-3 md:px-20 py-3'>
        <div className="Homepage_topTalents">
          <p className="border-l-2 border-[#FF8D00] py-1 px-2  text-[#071A10] font-bold">EXPLORE TALENT</p>

          <Link to="/filterPage" className="Homepage_topTalentsTopic">
            VIEW ALL
          </Link>
        </div>
        <div className="Homepage_SortCategory">
          <div className="InnerHomeFilter_Screen">
            {PositionSort.map((each, index) => (
              <Link
                to="/filterPage"
                className="Homepage_SortPosition bg-white"
                key={index}
              >
                {each}
              </Link>
            ))}
          </div>
        </div>
        {loader ? (
          <div className="flex justify-center align-items-center mt-7">
            <ScaleLoader
              color="#58DC53"
              size={45}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          // <div className="Homepage_Sortfootballers">
          //   {AllPlayersdata?.map((each, index) => (
          //     <Link
          //       to={`/viewplayerprofile/${each?.user_id}`}
          //       data-aos-easing="ease-in-out"
          //       data-aos-duration="1000"
          //       data-aos="flip-down"
          //       className="Homepage_foorballersBriefInfo"
          //       key={index}
          //     >
          //       <img src={each?.image_url} className="Homepage_PlayersImage" />
          //       {each?.service_type == "open" ||
          //       each?.price?.service_type == "open" ? (
          //         <p className="Homepage_PlayerStatus">
          //           {each?.minimum || each?.price?.minimum}
          //         </p>
          //       ) : each?.service_type == "free" ||
          //         each?.price?.service_type == "free" ? (
          //         <p className="Homepage_PlayerStatus">
          //           {each?.minimum || each?.price?.minimum}
          //         </p>
          //       ) : each?.service_type == "actual" ||
          //         each?.price?.service_type == "actual" ? (
          //         <p className="Homepage_PlayerStatus">
          //           ${each?.minimum || each?.price?.minimum}
          //         </p>
          //       ) : (
          //         <p className="Homepage_PlayerStatus">
          //           ${each?.minimum || each?.price?.minimum} - $
          //           {each?.maximum || each?.price?.maximum}
          //         </p>
          //       )}
          //       <p className="Homepage_PlayersName">
          //         {each?.firstname} {each?.surname}
          //       </p>
          //       <div className="Homepage_playersPosition">
          //         <p>{each?.position[0]?.position}</p>
          //         <RxDotFilled />
          //         <p>{each?.current_club}</p>
          //       </div>
          //     </Link>
          //   ))}
          // </div>
          <div className='flex flex-wrap justify-center lg:justify-start'>
            {AllPlayersdata?.map((each, index) => (
            <Link
                  to={`/viewplayerprofile/${each?.user_id}`} key={index} className='PlayerCardsInfo w-[390px] my-2 mr-2'>
              <img src={each?.image_url} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>PLAYERS</p>
                  <p className='text-sm text-[#6E798C]'>Language: {each?.language}</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> {shortenName(each?.firstname, each?.surname, maxLength)}</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm'> Location: {each?.location}</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2'> Strong foot: {each?.strong_foot}</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm'> Weight: {each?.weight}kg</span></p>           
              </div>
            </Link>
            ))}
            {/* <div className='PlayerCardsInfo w-[390px] my-2 mr-2'>
              <img src={playerFootballer} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>PLAYERS</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
            <div className='PlayerCardsInfo w-[390px] my-2 mr-2'>
              <img src={playerFootballer} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>PLAYERS</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div> */}
            </div>
        )}
        
        </div>
        </div>
    </div>
  )
}

export default PlayerHomePage