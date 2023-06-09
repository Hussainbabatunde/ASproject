import React from 'react'
import './Footer.css'
import {AiOutlineTwitter, AiOutlineInstagram} from 'react-icons/ai'
import {FaFacebook, FaLinkedinIn} from 'react-icons/fa'
import {BiCopyright} from 'react-icons/bi'

const Footer = () => {
  return (
    <div className='Homepage_FooterSection'>
        <div className='Homepage_footerCategory_SocialInfo'>
            <div className='Homepage_FooterCategory'>
                <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList'>Solutions for</li>
                    <li className='Hompage_footerList'>Athletes</li>
                    <li className='Hompage_footerList'>Brands</li>
                    <li className='Hompage_footerList'>Sponsors</li>
                    <li className='Hompage_footerList'>Donors</li>
                </ul>
                <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList'>Company</li>
                    <li className='Hompage_footerList'>About Us</li>
                    <li className='Hompage_footerList'>Careers</li>
                    <li className='Hompage_footerList'>Blog</li>
                </ul>
                <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList'>Support</li>
                    <li className='Hompage_footerList'>Help</li>
                    <li className='Hompage_footerList'>Contact Us</li>
                </ul>
            </div>
            <div style={{marginTop:"20px"}}>
                <p className='Homepage_FooterCompanyName'>AfriSport - Pro</p>
                <p className='Homepage_footerCopanyText'>AfriSport is a platform dedicated to connecting the best African talents to new opportunities</p>
                <div className='Homepage_FooterSocialmedia'>
                    <AiOutlineTwitter className='Homepage_footerSocialmediaIcon' />
                    <FaFacebook className='Homepage_footerSocialmediaIcon' />
                    <AiOutlineInstagram className='Homepage_footerSocialmediaIcon' />
                    <FaLinkedinIn className='Homepage_footerSocialmediaIcon' />
                </div>
            </div>
        </div>
        <div className='Homepage_footerCopyrightTerms'>
            <p><BiCopyright /> 2022AfriSport-Pro</p>
            <div className='Homepage_TermsandPolicy'>
                <p style={{marginRight:'20px'}}>Terms of use</p>
                <p>Privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default Footer