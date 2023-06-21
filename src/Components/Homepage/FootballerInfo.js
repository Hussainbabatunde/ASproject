import React from 'react'
import Player1 from '../../assets/Player1.png'
import {RxDotFilled} from 'react-icons/rx';
import { Link } from 'react-router-dom';
import trophy from "../../assets/lottie/107653-trophy.json";
import Lottie from 'lottie-react';

const FootballerInfo = ({title, pathTitle, data}) => {
  return (
    <div className='HomePage_talentsSection'>
            <div className='Homepage_topTalents'>
            <p className='Homepage_topTalentsTopic'>{title}</p>
            <Link to={pathTitle} className='Homepage_topTalentsTopic'>VIEW ALL</Link>
            </div>
            {data?.length == 0 ? 
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
                  <p>{each?.position.replace(/_/g, ' ')}</p>
                  <RxDotFilled />
                  <p>{each?.current_club}</p>
                </div>
              </Link>))}
              
            </div>}
            </div>
  )
}

export default FootballerInfo