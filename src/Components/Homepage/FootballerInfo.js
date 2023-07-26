import React from 'react'
import Player1 from '../../assets/Player1.png'
import {RxDotFilled} from 'react-icons/rx';
import { Link } from 'react-router-dom';
import trophy from "../../assets/lottie/107653-trophy.json";
import Lottie from 'lottie-react';
import {GrLocation} from 'react-icons/gr'
import {PiBarbellDuotone} from 'react-icons/pi'
import {PiPersonArmsSpreadBold} from 'react-icons/pi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import playerFootballer from '../../assets/footballPlayer1.svg'

const FootballerInfo = ({title, pathTitle, data}) => {
  return (
    <div className='HomePage_talentsSection px-3 md:px-20 py-3'>
            <div className='Homepage_topTalents'>
            <p className='border-l-2 border-[#FF8D00] py-1 px-2  text-[#071A10] font-bold'>{title}</p>
            <Link to={pathTitle} className='Homepage_topTalentsTopic'>VIEW ALL</Link>
            </div>
            {/* {data?.length == 0 ? 
            <div className="VerifySignupDiv">
            <Lottie
                  style={{ width: "200px", height: "200px" }}
                  animationData={trophy}
                />
            </div>:
            <div className='Homepage_footballers'
             >
             {data?.map((each, index)=>( <Link to={`/viewplayerprofile/${each?.user_id || each?.id}`} className='Homepage_foorballersBriefInfo'
             data-aos-easing='ease-in-out' 
             data-aos-duration="1000" 
             data-aos="flip-up" key={index}>
                <img src={each?.image_url} className='Homepage_PlayersImage' />
                {
                each?.service_type == 'open' || each?.price?.service_type == 'open'?<p className='Homepage_PlayerStatus'>{each?.minimum || each?.price?.minimum}</p>
                : each?.service_type == 'free' || each?.price?.service_type == 'free' ? <p className='Homepage_PlayerStatus'>{each?.minimum || each?.price?.minimum}</p> 
                : each?.service_type == 'actual' || each?.price?.service_type == 'actual'? <p className='Homepage_PlayerStatus'>${each?.minimum || each?.price?.minimum}</p>
                : <p className='Homepage_PlayerStatus'>${each?.minimum || each?.price?.minimum} - ${each?.maximum || each?.price?.maximum}</p>
                }
                <p className='Homepage_PlayersName'>{each?.firstname} {each?.surname}</p>
                <div className='Homepage_playersPosition'>
                  <p>{each?.position[0]?.position}</p>
                  <RxDotFilled />
                  <p>{each?.current_club}</p>
                </div>
              </Link>))}
              
            </div>} */}
            <div className='flex'>
            <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation       
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={'auto'}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {/* <div> */}
      {data?.map((each, index)=>(
      <SwiperSlide key={index}>
            <div className='PlayerCardsInfo w-[395px] my-2 mr-2'>
              <img src={each?.image_url} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>{title== 'TOP RATED TALENTS'? 'TOP RATED' : title }</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
            </SwiperSlide>
      ))}
            {/* <SwiperSlide>
            <div className='PlayerCardsInfo w-[395px] my-2 mr-2'>
              <img src={playerFootballer} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>{title== 'TOP RATED TALENTS'? 'TOP RATED' : title }</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='PlayerCardsInfo w-[395px] my-2 mr-2'>
              <img src={playerFootballer} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>{title== 'TOP RATED TALENTS'? 'TOP RATED' : title }</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='PlayerCardsInfo w-[395px] my-2 mr-2'>
              <img src={playerFootballer} className='ImgPlayerCard_infoDetails' />
              <div className='playerCard_infoDetails px-2 py-4 w-full'>
                <div className='flex justify-between w-full'>
                  <p className='text-sm text-[#6E798C]'>{title== 'TOP RATED TALENTS'? 'TOP RATED' : title }</p>
                  <p className='text-sm text-[#6E798C]'>Language: English</p>
                  </div> 
                  <p className='text-2xl font-bold text-[#081F32] py-3'> Hussain Babatunde</p>    
                  <p className=' flex items-center'><GrLocation className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Location: Nigeria</span></p> 
                  <p className=' flex items-center py-1'><PiBarbellDuotone className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Strong foot: Right</span></p>
                    <p className=' flex items-center py-1'><PiPersonArmsSpreadBold className='text-md' /><span className='ml-2 text-sm text-[#081F32]'> Weight: 30kg</span></p>           
              </div>
            </div>
            </SwiperSlide> */}
            {/* </div> */}
            </Swiper>
            </div>
            </div>
  )
}

export default FootballerInfo