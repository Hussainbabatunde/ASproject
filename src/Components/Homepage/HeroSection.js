import React from "react";
import "./HeroSection.css";
import { CiSearch } from "react-icons/ci";
import footballer from "../../assets/footballerHero.png";

const HeroSection = () => {
  return (
    <div className="heroSection_background">
      <div
        className="heroSection_Contentword"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
        data-aos="fade-right"
      >
        <p className="heroSection_ContentTopic">
          THE BEST AND BRIGHTEST AFRICAN FOOTBALL TALENT
        </p>
        <p className="heroSection_ContentWords">
          Enquire about the talent/manager and contact them instantly.
        </p>
        <div className="heroSection_Searchitem">
          <CiSearch className="heroSection_SearchIcon" />
          <input
            type="text"
            className="heroSection_SearchInput"
            placeholder="Search for clubs or players."
          />
          <button className="heroSection_SearchButton">Search</button>
        </div>
      </div>
      <img
        src={footballer}
        data-aos="fade-left"
        data-aos-duration="1000"
        className="heroSection_ImageFootballer"
      />
    </div>
  );
};

export default HeroSection;
