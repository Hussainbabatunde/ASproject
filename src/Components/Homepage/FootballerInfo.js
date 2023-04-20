import React from 'react'
import Player1 from '../../assets/Player1.png'
import {RxDotFilled} from 'react-icons/rx';
import { Link } from 'react-router-dom';

const FootballerInfo = ({title, pathTitle, data}) => {
  return (
    <div className='HomePage_talentsSection'>
            <div className='Homepage_topTalents'>
            <p className='Homepage_topTalentsTopic'>{title}</p>
            <Link to={pathTitle} className='Homepage_topTalentsTopic'>VIEW ALL</Link>
            </div>
            <div className='Homepage_footballers'
             >
             {data.map((each, index)=>( <div className='Homepage_foorballersBriefInfo'
             data-aos-easing='ease-in-out' 
             data-aos-duration="1000" 
             data-aos="fade-left" key={index}>
                <img src={each?.image} className='Homepage_PlayersImage' />
                <p className='Homepage_PlayerStatus'>{each?.amount}</p>
                <p className='Homepage_PlayersName'>{each?.playername}</p>
                <div className='Homepage_playersPosition'>
                  <p>{each?.position}</p>
                  <RxDotFilled />
                  <p>{each?.club}</p>
                </div>
              </div>))}
              
            </div>
            </div>
  )
}

export default FootballerInfo