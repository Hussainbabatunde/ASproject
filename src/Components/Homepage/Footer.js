import React from "react";
import "./Footer.css";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";
import footerAfriLogo from "../../assets/footerAfriLogo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Homepage_FooterSection max-w-[1400px] mx-auto">
      <div className="Homepage_footerCategory_SocialInfo">
        <div className="Homepage_FooterCategory">
          {/* <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList'>Solutions for</li>
                    <li className='Hompage_footerList'>Athletes</li>
                    <li className='Hompage_footerList'>Brands</li>
                    <li className='Hompage_footerList'>Sponsors</li>
                    <li className='Hompage_footerList'>Donors</li>
                </ul> */}
          <img src={footerAfriLogo} />
          <ul className="Homepage_footerListCategory">
            <li className="Hompage_footerList text-xl font-bold mb-3">
              Company
            </li>
            <Link to="/filterPage" style={{ color: "white" }}>
              <li className="Hompage_footerList text-lg">Players</li>
            </Link>
            <Link to="/pricingpage">
              <li className="Hompage_footerList text-lg">Pricing</li>
            </Link>
            {/* <li className='Hompage_footerList text-lg'>About Us</li> */}
          </ul>
          <ul className="Homepage_footerListCategory">
            <li className="Hompage_footerList text-xl font-bold mb-3">
              Policy
            </li>
            {/* <li className='Hompage_footerList text-lg'>Terms & Conditions</li>
                    <li className='Hompage_footerList text-lg'>Privacy policy</li>
                     */}

            <Link to="/mission" style={{ color: "white" }}>
              <li className="Hompage_footerList text-lg"> Mission</li>
            </Link>
            <Link to="/terms">
              <li className="Hompage_footerList text-lg">Terms & Conditions</li>
            </Link>
          </ul>
        </div>
        {/* <div style={{marginTop:"20px"}}>
                <p className='Homepage_FooterCompanyName'>AfriSport - Pro</p>
                <p className='Homepage_footerCopanyText'>AfriSport is a platform dedicated to connecting the best African talents to new opportunities</p>
                <div className='Homepage_FooterSocialmedia'>
                    <AiOutlineTwitter className='Homepage_footerSocialmediaIcon' />
                    <FaFacebook className='Homepage_footerSocialmediaIcon' />
                    <AiOutlineInstagram className='Homepage_footerSocialmediaIcon' />
                    <FaLinkedinIn className='Homepage_footerSocialmediaIcon' />
                </div>
            </div> */}
      </div>
      <div className="Homepage_footerCopyrightTerms">
        <p className="flex items-center">
          <BiCopyright /> 2022AfriSport-Pro
        </p>

        <p className="flex items-center ml-7">Email: Afrisportpro@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
