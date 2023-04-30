import React from 'react'
import './profileform.css'
import {TbCurrencyNaira} from 'react-icons/tb'

const BusinessService = () => {
  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Business Service Price</p>
        <p className='Scoutpage_Profile_filldetailstext'>Select what the price for your service to <b>scouts</b></p>
        <div className='Scoutpage_Profile_radiolabel'>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio'/> Range</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio'/> Actual</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio'/> Open</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio'/> Free</label>
        </div>
        <p className='Scoutpage_Profile_filldetailstext'>You won't go below this price</p>
        <div className='Scoutpage_Profile_fromtoBusiness'>
            <div className='Scoutpage_Profile_fromBusiness'>
                <b>From</b>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' className='Scoutprofile_frominput' />
                </div>
            </div>
            <div className='Scoutpage_Profile_fromBusiness'>
                <b>To</b>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' className='Scoutprofile_frominput' />
                </div>
            </div>
        </div>
        
        <button className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default BusinessService