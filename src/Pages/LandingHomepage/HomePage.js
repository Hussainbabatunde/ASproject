import React from 'react'
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

const HomePage = () => {
  const data = [
    {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
    {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
    {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
    {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'}
  ]
  const Sortdata = [
    {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
    {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
    {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
    {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'},
    {playername: 'Ahmed Musa', amount: 'Free', image: Player1, position: 'Fullback', club: 'Chelsea'},
    {playername: 'Victor Moses', amount: 'From $29', image: Player2, position: 'Striker', club: 'Manchester United'},
    {playername: 'Ngolo Kante', amount: '$300000', image: Player3, position: 'GoalKeeper', club: 'Kano Pillars'},
    {playername: 'Harry Kane', amount: 'Free', image: Player4, position: 'RWB', club: 'Enyimba'}
  ]
  const PositionSort = ['GoalKeeper', 'Center backs(Defender)', 'Fullbacks (Defender)', 'Center midfielders', 'Attacking midfielders', 'Defensive midfielders', 'Wingers', 'Strikers']
  return (
    <div>
        <Header/>
        <div className='Homepage_contents'>
            <HeroSection />
            <FootballerInfo title='TOP RATED TALENTS' pathTitle='' data={data} />
            <FootballerInfo title='RECOMMENDED' pathTitle='' data={data} />
            <div className='Homepage_topTalents'>
            <p className='Homepage_topTalentsTopic'>EXPLORE TALENT</p>
            <div className='Hompage_exploreSort'>
              <img src={DownSort} />
              <p className='Homepage_SortText'>Sort: Recommended</p>
            </div>
            </div>
            <div className='Homepage_SortCategory'>
              {PositionSort.map((each, index)=>(
            <p className='Homepage_SortPosition' key={index}>{each}</p>
            ))}
            </div>
            <div className='Homepage_Sortfootballers'>
             {Sortdata.map((each, index)=>( <div className='Homepage_foorballersBriefInfo' key={index}>
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
            <Footer />
    </div>
  )
}

export default HomePage