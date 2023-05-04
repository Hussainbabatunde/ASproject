import React from 'react'

const ScoutProfilePhysicalStats = () => {
  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Physical Stats</p>
        <p className='Scoutpage_Profile_Profileformlabeltext'>Gender</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Male/Female' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Height</p>
        <input type='email' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Feets' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Weight</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Kg' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Language</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='---' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Strong foot</p>
        <select className='Scoutpage_Profile_ProfileformlabelInput'>
            <option>Left</option>
            <option>Right</option>
        </select>
        
        <button className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default ScoutProfilePhysicalStats