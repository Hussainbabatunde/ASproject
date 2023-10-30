import React, { useEffect, useState } from 'react'
import '../Scout/ScoutPayment.css' 
import {BsFillCalendar2Fill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {AiFillBank} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutAuth } from '../../Slice/auth/Login'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import { UserLogout } from './UserLogOut'
import { GetAdvertPaymentApi, GetAllPaymentApi, GetOfferPaymentApi } from '../../Slice/Player/PlayerPayment/PaymentSlice'
import { format } from 'date-fns'
import { ClockLoader } from "react-spinners";
import { reset as resetLoginSlice } from "../../Slice/auth/Login";
import {reset as resetPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import {reset as resetPlayerFanDealSlice} from "../../Slice/Player/PlayerDeal/PlayerFanDealSlice"
import {reset as resetPlayerHomepageSlice} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage"
import {reset as resetManagerSlice} from "../../Slice/Player/PlayerManager/PlayerManagerSlice"
import {reset as resetPaymentSlice} from "../../Slice/Player/PlayerPayment/PaymentSlice"
import {reset as resetViewSlice} from "../../Slice/Player/PlayerView/PlayerViewSlice"
import {reset as resetPlayerProfileSlice} from "../../Slice/Player/Playerprofile/PlayerProfileSlice"
import {reset as resetFanDealSlice} from "../../Slice/Fan/FanDealsApiPage/FanDealSlice"

import {reset as resetFanProfileSlice} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice"

import {reset as resetScoutProfileSlice} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice"

import {reset as resetScoutDealSlice} from "../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice"


const PlayerPayment = () => {
    const dispatch = useDispatch()
    const [totalPayment, setTotalPayment] = useState(null)
    const [totalFirstmonth, setTotalFirstMonth] = useState(null)
    const [totalLastmonth, setTotalLastMonth] = useState(null)
    const [loading, setloading] = useState(false)
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // UserLogout()
        
    await dispatch(resetLoginSlice())
    await dispatch(resetPlayerDealSlice())
    await dispatch(resetPlayerFanDealSlice())
    await dispatch(resetPlayerHomepageSlice())
    await dispatch(resetManagerSlice())
    await dispatch(resetPaymentSlice())
    await dispatch(resetViewSlice())
    await dispatch(resetPlayerProfileSlice())
    await dispatch(resetFanDealSlice())
    await dispatch(resetFanProfileSlice())
    await dispatch(resetScoutProfileSlice())
    await dispatch(resetScoutDealSlice())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const AllPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.gottenAllPaymentData)
    const OfferPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.getOfferPaymentData)
    const AdvertPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.getAdvertPaymentData)
    console.log('all advert payment ', OfferPaymentTrans)

    useEffect(()=>{
        const calcPayment = () =>{
            let amountSum = 0
            if (AllPaymentTrans && AllPaymentTrans.length > 0) {
            for (let i=0; i<AllPaymentTrans?.length; i++){
                amountSum += Number(AllPaymentTrans[i]?.amount)
                // console.log(AllPaymentTrans[i].amount)
            }
            console.log(format(new Date(AllPaymentTrans[0].created_at), 'MMMM yyyy'))
            console.log(format(new Date(AllPaymentTrans[AllPaymentTrans.length-1].created_at), 'MMMM yyyy'))
            const firstMonth = format(new Date(AllPaymentTrans[0].created_at), 'MMMM yyyy');
            const lastMonth = format(new Date(AllPaymentTrans[AllPaymentTrans.length-1].created_at), 'MMMM yyyy');
            setTotalFirstMonth(firstMonth)
            setTotalLastMonth(lastMonth)
        }
            setTotalPayment(amountSum)
        }
        calcPayment()
    }, [AllPaymentTrans])
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Scout Deals'},
        // {id: 3, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
        {id: 4, pathTo: '/afrisport/player/managerdeal', pathName: 'Talent Manager Request'},
        {id: 5, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 6, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]
    const dataInfo = [
        {id: 1, date: 'Feb 23, 2023', amt:'14,500'},
        {id: 2, date: 'Feb 23, 2023', amt:'11,500'},
        {id: 3, date: 'Feb 23, 2023', amt:'4,000'}
    ]

    useEffect(()=>{
        const paymentCall = async () =>{
            setloading(true)
            await dispatch(GetAllPaymentApi())
            await dispatch(GetOfferPaymentApi())
            await dispatch(GetAdvertPaymentApi())
            setloading(false)
        }
        paymentCall()
    },[])


  return (
    <div className="Scoutpage_maxWidthContainer">
    <div  className='Scoutpage_contents'>
    <div className='Scoutpage_AccountLogout_div'>
        <p className='Scoutpage_AccountWord'>Account</p>
        <p className='Scoutpage_AccountWord' style={{cursor:'pointer'}} onClick={handleLogout}>Logout <RxExit /></p>
    </div>
    <div className='Scoutpage_LinkPages'>
       {data?.map((each, index)=>(
         <NavLink to={each?.pathTo} key={index} className={({isActive})=> (isActive ? 'Scoutpage_Profileactivepage':'Scoutpage_Profilepage')}>{each?.pathName}</NavLink>
        ))}
    </div>
    {loading? 
    <div className='flex justify-center align-center bg-white min-h-full p-2'>
        <ClockLoader
                                  color="#7F351D"
                                  size={25}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
    </div>
    :
    <div className='Scoutpage_PaymentContent'>
        <div className='Scoutpage_PaymentEarnings'>
            <div className='Scoutpage_PaymentEarnings_firstrow'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Earnings</p>
                <p className='Scoutpage_PaymentEarnings_earnfigure'>${totalPayment}</p>
            </div>
            <p className='Scoutpage_PaymentEarnings_datePayed'>
                <BsFillCalendar2Fill className='Scoutpage_PaymentEarnings_dateIcon' />
                <span className='Scoutpage_PaymentEarnings_monthandyear'>{totalFirstmonth}</span>
                </p>
        </div>
        <div className='Scoutpage_TransGetpaid'>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Offer Transaction</p>
                
                <div className='Scoutpage_TransGetpaid_dateandamt'>
                {OfferPaymentTrans?.map((each,index)=>(
                <div key={index} className='Scoutpage_Getpaid_dateSec'>
                    <p className='Scoutpage_Getpaid_monthandyear'>{format(new Date(each?.created_at), 'MMMM yyyy')}</p>
                <p className='Scoutpage_Getpaid_monthandyear'>${each?.amount}</p>
                </div>
                ))}</div>
            
            </div>
            <Link to='/afrisport/player/viewtransactions' state={{OfferPaymentTrans}} className='Scoutpage_transaction_Linkotherpages'>View All Transactions</Link>
            </div>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Adverts Transaction</p>
                
                <div className='Scoutpage_TransGetpaid_dateandamt'>
                {AdvertPaymentTrans?.map((each,index)=>(
                <div key={index} className='Scoutpage_Getpaid_dateSec'>
                    <p className='Scoutpage_Getpaid_monthandyear'>{format(new Date(each?.created_at), 'MMMM yyyy')}</p>
                <p className='Scoutpage_Getpaid_monthandyear'>${each?.amount}</p>
                </div>
                ))}</div>
            
            </div>
            <Link  to='/afrisport/player/viewtransactions' state={{AdvertPaymentTrans}} className='Scoutpage_transaction_Linkotherpages'>View All Transactions</Link>
            </div>
        </div>
        <div className='Scoutpage_TransGetpaid'>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Transaction</p>
                
                <div className='Scoutpage_TransGetpaid_dateandamt'>
                {dataInfo?.map((each,index)=>(
                <div key={index} className='Scoutpage_Getpaid_dateSec'>
                    <p className='Scoutpage_Getpaid_monthandyear'>{each?.date}</p>
                <p className='Scoutpage_Getpaid_monthandyear'>N{each?.amt}</p>
                </div>
                ))}</div>
            
            </div>
            <Link  className='Scoutpage_transaction_Linkotherpages'>View All Transactions</Link>
            </div>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>How You Get Paid  </p>
                <div className='Scoutpage_Getpaid_acctandbank'>
                    <div className='Scoutpage_Getpaid_bankiconholder'><AiFillBank className='Scoutpage_Getpaid_bankicon' /></div>
                    <div className='Scoutpage_Getpaid_acctnoandname'>
                        <p className='Scoutpage_Getpaid_accnumber'>Wire transfer to bank account 12345678</p>
                        <p className='Scoutpage_Getpaid_accnumber'>Zenith Bank</p>
                    </div>
                </div>
                </div>
                <Link  className='Scoutpage_transaction_Linkotherpages'>Change Payment</Link>
            </div>
        </div>
        </div>}
    </div>
    </div>
  )
}

export default PlayerPayment