import React, { useState } from "react";
import "./HeroSection.css";
import { CiSearch } from "react-icons/ci";
import footballer from "../../assets/footballerHero.png";
import playerball from "../../assets/player-ball.svg";
import { FilteredClubPlayerApi } from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {MdPeopleAlt} from 'react-icons/md'

const HeroSection = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const OnchangeSearchPlayer = (e) => {
    setData(e.target.value);
  };
  const navigation = useNavigate();
  const handleSearchPlayer = (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    dispatch(FilteredClubPlayerApi(data));
    setLoading(false);
    navigation("/filterPage");
  };

  return (
    <div className="heroSection_background flex-col lg:flex-row min-h-[90vh] ">
      {/* <div
        className="heroSection_Contentword"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
        data-aos="fade-right"
      >
        <p className="heroSection_ContentTopic">
          THE BEST AND BRIGHTEST AFRICAN FOOTBALL TALENT
        </p>
        <p className="heroSection_ContentWords">
          Enquire about talent/manager and contact them instantly.
        </p>
        <form onSubmit={handleSearchPlayer} className="heroSection_Searchitem">
          <CiSearch className="heroSection_SearchIcon" />
          <input
            type="text"
            value={data}
            onChange={OnchangeSearchPlayer}
            className="heroSection_SearchInput"
            placeholder="search for club or players"
          />
          {loading ? (
            <button type="submit" className="heroSection_SearchButton">
              <CircularProgress size={15} />
            </button>
          ) : (
            <button
              disabled={data.trim() === ""}
              type="submit"
              className="heroSection_SearchButton"
            >
              Search
            </button>
          )}
        </form>
      </div>
      <img
        src={footballer}
        data-aos="fade-left"
        data-aos-duration="1000"
        className="heroSection_ImageFootballer"
      /> */}
      <div className="HeroSec_TextSection md:ml-0 lg:ml-10 pt-5 md:pt-10 lg:pt-20 flex flex-col">
        <p className='text-6xl text-[#071A10] font-bold'>Brightest African Football Talents</p>
        <p className='text-[#071A10] text-lg w-[100%] md:w-[400px] mt-5'>We vert qualified and the most talented African players from all over the continent.</p>
        <Link to='/' className="ViewPlayersButton bg-[#071A10] flex w-[150px] justify-center items-center mt-[60px] py-3 rounded">View Players <MdPeopleAlt className='text-white ml-1 text-xl' /> </Link>
        <div className='flex mt-[60px] mb-10'>
          <p className="border-l-2 border-[#FF8D00] py-1 px-2  text-[#071A10]"> <span className="font-bold">1000++</span> Scout Visits</p>
          <p className="border-l-2 border-[#FF8D00] py-1 px-2  text-[#071A10] ml-10 "> <span className="font-bold">1000++</span> Talent Audits</p>
        </div>
      </div>
      <img src={playerball} className="lg:w-[50%]" />
    </div>
  );
};

export default HeroSection;
