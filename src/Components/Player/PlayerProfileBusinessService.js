import React, { useState } from 'react'
import '../Scout/profileform.css'
import {TbCurrencyNaira} from 'react-icons/tb'

const PlayerProfileBusinessService = () => {
    const [priceType, setPriceType] = useState('range')
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const handleRadioButtonChange = () => {
        setIsChecked(!isChecked);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setPriceType('range')
      }; 
      const handleRadioButtonChange2 = () => {
        setIsChecked2(!isChecked2);
        setIsChecked(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setPriceType('actual')
      };
      const handleRadioButtonChange3 = () => {
        setIsChecked3(!isChecked3);
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked4(false);
        setPriceType('open')
      };
      const handleRadioButtonChange4 = () => {
        setIsChecked4(!isChecked4);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked(false);
        setPriceType('free')
      };

  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Business Service Price</p>
        <p className='Scoutpage_Profile_filldetailstext'>Select what the price for your service to <b>scouts</b></p>
        <div className='Scoutpage_Profile_radiolabel'>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange} checked={isChecked} value='range'/> Range</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange2} checked={isChecked2} value='actual'/> Actual</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange3} checked={isChecked3} value='open'/> Open</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange4} checked={isChecked4} value='free'/> Free</label>
        </div>
        {priceType == 'range' && 
        <div>
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
        </div>}
        {priceType == 'actual' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>This is your Price and it's none negotiable</p>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Preferred </p>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' className='Scoutprofile_frominput' />
                </div>
        
        </div>}
        {priceType == 'open' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>Our Team will evaluate your profile and fix an amount</p>        
        </div>}
        {priceType == 'free' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>You are not charging a price.  </p>        
        </div>}
        
        <button className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default PlayerProfileBusinessService