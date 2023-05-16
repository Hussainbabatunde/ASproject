import React from 'react'
import { Link } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import './PlayersDeals.css'
import {FaDownload} from 'react-icons/fa'
import imgRecipient from '../../assets/imgRecipient.png'

const PlayerDealsMade = () => {
  return (
    <div className='PlayersViewDeals_Container'>
        <div className='PlayersDealsMade_Page'>
        <div className='ScoutViewProfile_navigationprogress'>
                <Link to='/afrisport/player/deal' className='ScoutViewProfile_navigationback'>Deals</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Details</p>
            </div>
            <div className='PlayerViewDeals_InfoSection'>
            <div className='PlayerViewDeals_InfoSection_UpperSegment'>
              <div className='PlayerViewdetails_TopicSec'>                
                <p className='PlayerViewdetails_DetailsText'>Details (Not Paid)</p>
                <div className='PlayerViewdetails_DownloadButtons'>
                  <button className='PlayerViewdetails_DownloadPdf'><FaDownload style={{color:'#3D413D', marginRight: '7px'}} /> Download</button>
                  <button className='PlayerViewdetails_Updatebutton'>Update</button>
                  <button className='PlayerViewdetails_Paynowbutton'>Pay Now</button>
                </div>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Sent By:</label>
                <p className='PlayerViewdetails_labelresponse'><img src={imgRecipient}  className='useTable_ImageRecipient' />
                <span className='PlayerViewdetails_sendername'> Nicole Frami</span>
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Duration:</label>
                <p className='PlayerViewdetails_labelresponse'> 6 months</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Expiring:</label>
                <p className='PlayerViewdetails_labelresponse'> 23 - 8 - 2023</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Amount:</label>
                <p className='PlayerViewdetails_labelresponse'> $100,000</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Name:</label>
                <p className='PlayerViewdetails_labelresponse'> Join Europe Football</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Status:</label>
                <p className='PlayerViewdetails_labelresponse'> <span className='PlayerViewdetails_response_styling'>Accepted</span></p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Description:</label>
                <p className='PlayerViewdetails_labelresponse'> This is to describe the negotiation hjdskjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p>
              </div>
              </div>
              <div className='PlayerViewDeals_InfoSection_LowerSegment'>
                  <div className='PlayerViewDeals_CommentImgName'>
                  <img src={imgRecipient}  className='useTable_ImageRecipient' />
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                    <p className='PlayerViewdetails_sendername'>Ms Lucas Howe <span className='PlayerViewDeals_DateDetails'>3 days ago</span></p>
                    <p className='PlayerViewDeals_CommentDetails'> Hi, i am the talent manager for the player.</p>
                  </div>
                  </div>
                  <div className='PlayerViewDeals_CommentImgName'>
                  <img src={imgRecipient}  className='useTable_ImageRecipient' />
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                    <p className='PlayerViewdetails_sendername'>Ms Lucas Howe <span className='PlayerViewDeals_DateDetails'>3 days ago</span></p>
                    <p className='PlayerViewDeals_CommentDetails'> Hi, i am the talent manager for the player.</p>
                  </div>
                  </div>
                  <div className='PlayerViewDeals_CommentSectionDiv'>
                    <div className='PlayerViewDeals_CommentSectionInnerDiv'>
                      <textarea placeholder='Make a comment' style={{flex: 1, border:'none', minHeight: '50px'}} />
                      <button className='PlayerViewDeals_CommentButton'>Comment</button>
                    </div>
                  </div>
              </div>
            </div>
            </div>
    </div>
  )
}

export default PlayerDealsMade