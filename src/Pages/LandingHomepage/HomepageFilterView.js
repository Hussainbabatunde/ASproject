import React from 'react'
import Header from '../../Components/Header/Header'
import FilterHeroSection from '../../Components/Homepage/FilterHeroSection'

const HomepageFilterView = () => {
  return (
    <div>
        <Header />
        <div className='Homepage_contents'>
            <FilterHeroSection />
            <div className='FilterPage_ContentSection'>
                <div style={{position:'relative'}}>
                <div className='FilterPage_ResultFilter'>
                    <p className='FilterPage_TopicSearchResult'>Found 376 results for <span className='FilterPage_PositionSearchedFor'>Strikers</span></p>
                    <p className='FilterPage_LabelSearch'>Price, $</p>
                    <div style={{display:'flex', marginTop: '5px    '}}>
                        <input placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Age Range</p>
                    <div style={{display:'flex', marginTop: '5px    '}}>
                        <input placeholder='Min' className='FilterPage_MinPriceValue' type='text' />
                        <input placeholder='Max' className='FilterPage_MaxPriceValue' type='text' />
                    </div>
                    <p className='FilterPage_LabelSearch'>Height (ft)</p>
                    <input className='FilterPage_HeightSearch' type="text" placeholder='ft' />
                    <p className='FilterPage_LabelSearch'>Country</p>
                    <select className='FilterPage_HeightSearch'>
                        <option disabled></option>
                        <option>All</option>
                    </select>
                    <p className='FilterPage_LabelSearch'>Stronger Foot</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Left</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Right</label>
                        </div>
                    </div>
                    
                    <p className='FilterPage_LabelSearch'>Position</p>
                    <div className='FilterPage_StrongerfootSec'>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Goalkeeper</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Center Back(Defenders)</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Full Back(Defenders)</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Central midfielders</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Attacking midfielders</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Defensive midfielders</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Wingers</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Striker</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Striker</label>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <input type='checkbox' />
                            <label style={{marginLeft:"10px"}}>Striker</label>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HomepageFilterView