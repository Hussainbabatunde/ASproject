import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import '../Player/PlayersDeals.css'
import {FaDownload} from 'react-icons/fa'
import imgRecipient from '../../assets/imgRecipient.png'
import { useDispatch, useSelector } from 'react-redux'
import { GetPlayerOfferDetailsApi, GetPlayerOfferDownloadApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice'
import { PulseLoader } from 'react-spinners'
import { GetScoutOfferDetailsApi, GetScoutOfferDownloadApi, ScoutDealCommentsApi, ScoutMakeCommentApi, ScoutMakePaymentApi } from '../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice'
import { CircularProgress, Skeleton } from '@mui/material'
import UpdateOfferDetail from './UpdateOfferDetail'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import ScoutPayNow from './ScoutPayNow'
import { differenceInWeeks } from 'date-fns'
import { loadStripe } from '@stripe/stripe-js';
// import PaystackPop from '@paystack/inline-js'
import { PaystackButton, usePaystackPayment } from 'react-paystack'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';



const ScoutDealsMade = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
  const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
  const [downloadPage, setDownloadPage] = useState(false)
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')
  const [commentload, setCommentLoad] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const gottenDetails = useSelector((state)=> state.reducer?.ScoutDealsSlice?.getOfferDetailsData)
  const expireData = gottenDetails?.data?.offers?.expiration.slice(0,11);
  const senderId = useSelector((state)=> state.reducer?.ScoutDealsSlice?.getOfferDetailsData?.data?.offers?.to)
  const CommentsGotten = useSelector((state)=> state.reducer?.ScoutDealsSlice?.scoutcommentsOfferData)
  // console.log('comments ', gottenDetails)
  // console.log('id ', id)
  // console.log('user id', userId)

  const startDate = new Date(gottenDetails?.data?.offers?.to_start);
const endDate = new Date(gottenDetails?.data?.offers?.to_end);

const numberOfWeeks = differenceInWeeks(endDate, startDate);
// console.log( 'no of weeks ',numberOfWeeks)

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    console.log('api key ',process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    stripePromise = loadStripe('pk_test_51NS0CiD4vXmmEnk3KJBwbFAr4J987xEZsVc7ODZ1u2xRR8ztywYioLV2svk23G3NDDKvuxuc5X7WiwQfCw2TTifm00yw6CELs6');
  }
  return stripePromise;
};

  
  useEffect(()=>{
    const offerDetails = async()=>{
      setLoading(true)
      await dispatch(GetScoutOfferDetailsApi({id, userId}))
      // await dispatch(ScoutDealCommentsApi({id, userId, senderId}))
      setLoading(false)
    }
    offerDetails()
  },[])

  const handleShowUpdate = () =>{
    setShow(true)
    console.log(show)
  }

  const handleHide = () =>{
    setShow(false)
  }

  useEffect(()=>{
    const offerDetails = async()=>{
      setCommentLoad(true)
      await dispatch(ScoutDealCommentsApi({id, userId, senderId}))
      setCommentLoad(false)
    }
    offerDetails()
  },[senderId])

  const handleComment = (e) =>{
    setComment(e.target.value)
  }
  const handleDownload = async() =>{
    setDownloadPage(true)
    console.log(id, userId)
    await dispatch(GetScoutOfferDownloadApi(id, userId))
    setDownloadPage(false)
  }
  const handleHideShowPay = () =>{
    setShowPay(false)
  }

  const handleSubmitComment = async (e) =>{
    e.preventDefault()
    const sentData ={}
    sentData.comment = comment
    sentData.others = userId
    sentData.player = gottenDetails?.data?.offers?.to
    sentData.offer_id = gottenDetails?.data?.offers?.id
    setCommentLoad(true)
    // console.log(id, userId, senderId)
    await dispatch (ScoutMakeCommentApi(sentData))    
    await dispatch(ScoutDealCommentsApi({id, userId, senderId}))
    // console.log(sentData)
    setComment('')
    setCommentLoad(false)
  }
    

  // console.log('gottenDetails ', gottenDetails)
  const gottenMarketfee= useSelector((state)=> state?.reducer?.GetPaymentSlice?.getMarketPriceData?.data)
  const recipientfee= Number(gottenDetails?.data?.offers?.value)
  const marketFee= Number(gottenMarketfee)
  const amount = recipientfee + marketFee 
  // const publicKey = "pk_test_e22c091552997080bc70b61637096324bb1405ba" 
  const email = useSelector((state) => state.reducer.LoginSlice?.logindata?.data?.user?.email);

  const componentProps = {
    email,
    amount,
    // metadata: {
    //   name,
    //   phone,
    // },
    publicKey: "pk_test_31c9cc0911bc099da6bbea574d98f45f06ef2fa8" ,
    text: "Pay Now"
  }

  const onSuccess = ({reference}) => {
    // alert(reference)
    console.log(reference)
  }

  const onClose= () =>{
    console.log('closed')
  }

  async function handleCheckout(e) {
    e.preventDefault()
    // const paystack = new PaystackPop()
    // paystack.newTransaction({
    //   key : 'pk_live_61cbf727786a5c521a98990828f66b7e6dac6c97',
    //   amount
    // })
  }

  const [data, setData] = useState({})
    const AdvertValue = recipientfee + marketFee 
    
    const styles = StyleSheet.create({
      page: {
        // flexDirection: 'row',
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      },
      imageCenter:{
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    transactDetail:{
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    recipientDiv:{
        padding: 20,
    },
    recipienttopic:{
        fontSize: 15,
        fontWeight: "bold",
    },
    titleandResponse:{
      flexDirection: 'row',
      marginVertical: 10,
      alignItems:'center',
    },
    Recipientname:{
        fontWeight: "bold",
        color: "#808080",
        marginRight: 10,
        fontSize: 15,
    },
    imgRecipient:{
        marginLeft: 30,
        width: 23,
        height: 23,
        marginRight: 10,
    },
    LogoImage:{
      width: 90,
    },
    nameRecp:{    
      fontSize: 15,
    }
    });
  
    // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.imageCenter}>
      <Image src={require('../../assets/afriLogopng.png')} style={styles.LogoImage} />
    </View>
    <Text  style={styles.transactDetail}>Transaction Detail</Text>
    <View style={styles.recipientDiv}>
      <Text style={styles.recipienttopic} >Recipient details</Text>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname}>Sender Name: </Text>
          {/* <Image style={styles.imgRecipient} src={senderInfo?.profile_pics}/> */}
          <Text style={styles.nameRecp}></Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname}>Recipient Name: </Text>
          {/* <Image style={styles.imgRecipient} src={gottenDetails?.data?.offers?.player?.profile_pics} /> */}
          <Text style={styles.nameRecp}>{gottenDetails?.data?.offers?.player?.firstname} {gottenDetails?.data?.offers?.player?.surname}</Text>
      </View>
      <View style={styles.titleandResponse} >
          <Text  style={styles.Recipientname}>Negotiation Name: </Text>
          <Text style={styles.nameRecp}>{gottenDetails?.data?.offers?.name}</Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname} >Negotiation Detail: </Text>
          <Text style={styles.nameRecp}>{gottenDetails?.data?.offers?.detail}</Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname}>Negotiation Status: </Text>
          <Text style={styles.nameRecp}>{gottenDetails?.data?.offers?.status}</Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname} >Duration: </Text>
          <Text style={styles.nameRecp}>{gottenDetails?.data?.offers?.duration}</Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname} >Amount: </Text>
          <Text style={styles.nameRecp}>${gottenDetails?.data?.offers?.recipient_earnings}</Text>
      </View>
      <View style={styles.titleandResponse}>
          <Text style={styles.Recipientname} >Expiring: </Text>
          <Text style={styles.nameRecp}>{expireData}</Text>
      </View>
    </View>
      </Page>
    </Document>
  );


  const initializepayment = usePaystackPayment(componentProps)


  return (
    <div className='PlayersViewDeals_Container'>
      <ToastContainer />
        <div className='PlayersDealsMade_Page'>
        {/* <div className='ScoutViewProfile_navigationprogress'>
                <Link to='/afrisport/player/deal' className='ScoutViewProfile_navigationback'>Deals</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Details</p>
            </div> */}
            <div className='PlayerViewDeals_InfoSection'>
            <div className='PlayerViewDeals_InfoSection_UpperSegment'>
              <div className='PlayerViewdetails_TopicSec'>                
                <p className='PlayerViewdetails_DetailsText'>Details {gottenDetails?.data?.offers?.payment_status == 'paid' ? "(Paid)" : '(Not Paid)'}</p>
                <div className='PlayerViewdetails_DownloadButtons'>
                  {/* <button className='PlayerViewdetails_DownloadPdf' onClick={handleDownload} style={{display:'flex', alignItems:"center"}}>
                    <FaDownload style={{color:'#3D413D', marginRight: '7px'}} /> 
                    {downloadPage ? 
                          <PulseLoader
                              color="black"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            /> :<span>Download</span>}
                    </button> */}
                    <div style={{display:'flex', alignItems:"center"}}>
                    <FaDownload style={{color:'#3D413D', marginRight: '7px'}} /> <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download'
      }
    </PDFDownloadLink>
    </div>
                  {userType!= 'player' && <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <button className='PlayerViewdetails_Updatebutton' onClick={handleShowUpdate}>Update</button>
                  {gottenDetails?.data?.offers?.recipient_earnings != '0.00' && gottenDetails?.data?.offers?.status == 'accepted'  && <button className='PlayerViewdetails_Paynowbutton' onClick={async()=> {
                    // initializepayment(onSuccess, onClose)
      data.offer_id = gottenDetails?.data?.offers?.id;
      data.value = Number(AdvertValue)
                        await dispatch(ScoutMakePaymentApi(data))
                  }}> Pay Now</button>}
                  {/* <PaystackButton {...componentProps} /> */}
                  </div>}
                </div>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Recipient:</label>
                <p className='PlayerViewdetails_labelresponse'>
                {loading? <Skeleton variant="circular" width={35} height={32} /> :<img src={gottenDetails?.data?.offers?.player?.profile_pics}  className='useTable_ImageRecipient' />}
                {loading?  <Skeleton variant="rounded" width={105} height={22} /> :<span className='PlayerViewdetails_sendername'> {gottenDetails?.data?.offers?.player?.firstname} {gottenDetails?.data?.offers?.player?.surname}</span>}
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Duration:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> {gottenDetails?.data?.offers?.duration} weeks</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Expiring:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{expireData}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Amount:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> ${gottenDetails?.data?.offers?.value}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Marketplace Fee:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> ${marketFee}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Total amount:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> ${amount}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Name:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{gottenDetails?.data?.offers?.name}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Status:</label>
                <p className='PlayerViewdetails_labelresponse'> 
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<span className='PlayerViewdetails_response_styling'>{gottenDetails?.data?.offers?.status}</span>}
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Description:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{gottenDetails?.data?.offers?.detail}</p>}
              </div>
              </div>
              <div className='PlayerViewDeals_InfoSection_LowerSegment'>
              {CommentsGotten?.data.map((each, index) =>( 
                  <div key={index} className='PlayerViewDeals_CommentImgName'>
                  {loading? <Skeleton variant="circular" width={35} height={32} /> :<img src={each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.profile_pics: each?.comments?.others?.profile_pics }  className='useTable_ImageRecipient' />}
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                  {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_sendername'>{each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.firstname  : each?.comments?.others?.firstname } {each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.surname  : each?.comments?.others?.surname } 
                    <span className='PlayerViewDeals_DateDetails'> {moment(each?.comments?.created_at).format('DD-MM-YYYY hh:mma')} </span>
                    </p>}
                    {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewDeals_CommentDetails'> {each?.comments?.comment} </p>}
                  </div>
                  </div>))}
                  <div className='PlayerViewDeals_CommentSectionDiv'>
                    <form onSubmit={handleSubmitComment} className='PlayerViewDeals_CommentSectionInnerDiv'>
                      <textarea onChange={handleComment} value={comment} placeholder='Make a comment' style={{flex: 1, border:'none', minHeight: '50px'}} />
                      <button type='submit' className='PlayerViewDeals_CommentButton'>
                      {commentload ? <CircularProgress size={15} /> :  <span>Comment</span>}
                        </button>
                    </form>
                  </div>
              </div>
            </div>
            </div>
            <UpdateOfferDetail show={show} setShow={setShow} handleHide={handleHide} userId= {userId} id={id} />
            <ScoutPayNow showPay={showPay} handleHideShowPay={handleHideShowPay} gottenDetails={gottenDetails} userId={userId} />
    </div>
  )
}

export default ScoutDealsMade;