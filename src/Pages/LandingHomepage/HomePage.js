import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import HeroSection from "../../Components/Homepage/HeroSection";
import "./Homepage.css";
import Player1 from "../../assets/Player1.png";
import Player2 from "../../assets/Player2.png";
import Player3 from "../../assets/Player3.png";
import Player4 from "../../assets/Player4.png";
import {TbPointFilled} from 'react-icons/tb'
import easywhiteafrilogo from "../../assets/easywhiteafrilogo.svg";
import PlayerEasyContract from '../../assets/playerFootballerEasyContract.svg';
import AfriBallLogo from "../../assets/AfriRoundLogo.svg";
import DownSort from "../../assets/DownSort.png";
import FootballerInfo from "../../Components/Homepage/FootballerInfo";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import playerFootballer from '../../assets/footballPlayer1.svg'
import Footer from "../../Components/Homepage/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader, ScaleLoader } from "react-spinners";
import {GrLocation} from 'react-icons/gr'
import {PiBarbellDuotone} from 'react-icons/pi'
import {PiPersonArmsSpreadBold} from 'react-icons/pi'
import {
  GetPlayersApi,
  GetRecommendedApi,
  GetTopRatedPlayersApi,
} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage";

const HomePage = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [Recommendeddata, setRecommendeddata] = useState(null);
  const [TopratedPlayersdata, setTopRatedPlayesdata] = useState(null);
  const [AllPlayersdata, setAllPlayersdata] = useState(null);

  useEffect(() => {
    const getPlayerDataHome = async () => {
      setLoader(true);
      await dispatch(GetPlayersApi());
      await dispatch(GetRecommendedApi());
      await dispatch(GetTopRatedPlayersApi());
      setLoader(false);
    };
    getPlayerDataHome();
  }, []);

  const Sortdata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.gottenPlayerData?.data
  );
  const GottenRecommendeddata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.recommendedPlayersData?.data
  );
  const GottenTopRatedPlayersdata = useSelector(
    (state) => state.reducer?.GetPlayerSlice?.topRatedPlayersData?.data
  );
  useEffect(() => {
    const initial = () => {
      const endIndex = 4;
      const slicedArray =
        endIndex <= GottenRecommendeddata?.length
          ? GottenRecommendeddata.slice(0, endIndex)
          : GottenRecommendeddata;
      setRecommendeddata(slicedArray);
    };
    initial();
  }, [GottenRecommendeddata]);

  useEffect(() => {
    const initial = () => {
      const endIndex = 4;
      const slicedArray =
        endIndex <= GottenTopRatedPlayersdata?.length
          ? GottenTopRatedPlayersdata.slice(0, endIndex)
          : GottenTopRatedPlayersdata;
      setTopRatedPlayesdata(slicedArray);
    };
    initial();
  }, [GottenTopRatedPlayersdata]);

  useEffect(() => {
    const initial = () => {
      const endIndex = 8;
      const slicedArray =
        endIndex <= Sortdata?.length ? Sortdata.slice(0, endIndex) : Sortdata;
      setAllPlayersdata(slicedArray);
    };
    initial();
  }, [Sortdata]);
  const PositionSort = [
    "GoalKeeper",
    "Center backs(Defender)",
    "Fullbacks (Defender)",
    "Center midfielders",
    "Attacking midfielders",
    "Defensive midfielders",
    "Wingers",
    "Strikers",
  ];
  console.log('AllPlayersdata ', AllPlayersdata);

  
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

// const shortenedName = shortenName(AllPlayersdata?.firstname, AllPlayersdata?.surname, maxLength);

  return (
    <div>
      <Header />
      {/* <div className="Homepage_contents"> */}
      <div>
        <HeroSection />
        <div className="verifiedBgDiv_Homepage flex flex-col lg:flex-row justify-center lg:justify-between items-center">
          <p className="text-2xl md:text-3xl text-white w-[100%] md:w-[450px]"><span className="font-bold">We Strive</span> To Create The Best MarketPlace For Football Talents</p>
          <div className="flex md:mt-4 lg:mt-0 justify-center lg:justify-start w-full lg:w-[40%]">
            <img src={AfriBallLogo} width='150px' height='150px' />
            <div className="text-white" style={{marginLeft:'20px'}}>
              <p className="text-2xl md:text-4xl" style={{ lineHeight:'normal'}}>100%</p>
              <p className='text-white' style={{fontSize:'22px', lineHeight:'normal'}}>VERIFIED</p>
              <p className="text-white">All Players Skillsets and</p>
              <p className="text-white">Performances are Verted to</p>
              <p className="text-white">Reach International Standards</p>
            </div>
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
          <>
            <FootballerInfo
              title="TOP RATED TALENTS"
              pathTitle="/filterPage"
              data={TopratedPlayersdata}
            />
            <FootballerInfo
              title="RECOMMENDED"
              pathTitle="/recommendedPage"
              data={Recommendeddata}
            />
          </>
        )}
        <div className="Homepage_EasyContractSec px-7 py-5 flex flex-col md:flex-row justify-evenly">
          <img src={PlayerEasyContract} className="Homepage_EasyContractImg" />
          <div className="mt-2 md:mt-0">
            <img src={easywhiteafrilogo} />
            <p className="text-white font-bold text-2xl pt-5">Easily Contract</p>
            <p className="text-white text-2xl">The Best African</p>
            <p className="text-white text-2xl">Football Talents</p>
            <div className="flex mt-7 text-white">
              <TbPointFilled className="text-white text-2xl" />
              <p className='ml-3 text-white'>Create an account</p>
            </div>
            <div className="flex mt-2 text-white">
              <TbPointFilled className="text-white text-2xl" />
              <p className='ml-3 text-white'>Send Your Proposal to Player</p>
            </div>
            <div className="flex mt-2 text-white">
              <TbPointFilled className="text-white text-2xl" />
              <p className='ml-3 text-white'>Negotiate and Close the Deal</p>
            </div>
            <button className="mt-9 bg-white w-[250px] py-3 rounded">Sign up</button>
          </div>
        </div>
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
            <div key={index} className='PlayerCardsInfo w-[390px] my-2 mr-2'>
              <img src={each?.image_url} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>PLAYERS</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> {shortenName(each?.firstname, each?.surname, maxLength)}</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: {each?.location}</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
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
        <div className="world_classhomeplayers py-5 flex flex-col justify-center items-center">
          <p className="text-white text-2xl md:text-4xl font-bold">World Class Talent</p>
          <p className="text-white text-2xl md:text-4xl font-bold">only on Afri Sport</p>
            <button className="mt-3 font-bold bg-[#071A10] w-[150px] md:w-[250px] text-white py-3 rounded">Sign up</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
