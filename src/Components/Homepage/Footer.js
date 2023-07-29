import React from 'react'
import './Footer.css'
import {AiOutlineTwitter, AiOutlineInstagram} from 'react-icons/ai'
import {FaFacebook, FaLinkedinIn} from 'react-icons/fa'
import {BiCopyright} from 'react-icons/bi'
import footerAfriLogo from '../../assets/footerAfriLogo.svg'

const Footer = () => {
  return (
    <div className='Homepage_FooterSection max-w-[1400px] mx-auto'>
        <div className='Homepage_footerCategory_SocialInfo'>
            <div className='Homepage_FooterCategory'>
                {/* <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList'>Solutions for</li>
                    <li className='Hompage_footerList'>Athletes</li>
                    <li className='Hompage_footerList'>Brands</li>
                    <li className='Hompage_footerList'>Sponsors</li>
                    <li className='Hompage_footerList'>Donors</li>
                </ul> */}
                <img src={footerAfriLogo} />
                <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList text-xl font-bold mb-3'>Company</li>
                    <li className='Hompage_footerList text-lg'>Players</li>
                    <li className='Hompage_footerList text-lg'>Pricing</li>
                    <li className='Hompage_footerList text-lg'>About Us</li>
                </ul>
                <ul className='Homepage_footerListCategory'>
                    <li className='Hompage_footerList text-xl font-bold mb-3'>Policy</li>
                    <li className='Hompage_footerList text-lg'>Terms & Conditions</li>
                    <li className='Hompage_footerList text-lg'>Privacy policy</li>
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
        <div className='Homepage_footerCopyrightTerms'>
            <p className='flex items-center'><BiCopyright /> 2022AfriSport-Pro</p>
            {/* <div className='Homepage_TermsandPolicy'>
                <p style={{marginRight:'20px'}}>Terms of use</p>
                <p>Privacy policy</p>
            </div> */}
        </div>
    </div>
  )
}

export default Footer