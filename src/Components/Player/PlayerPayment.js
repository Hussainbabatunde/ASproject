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

const PlayerPayment = () => {
    const dispatch = useDispatch()
    const [totalPayment, setTotalPayment] = useState(null)
    const [totalFirstmonth, setTotalFirstMonth] = useState(null)
    const [totalLastmonth, setTotalLastMonth] = useState(null)
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        UserLogout()
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const AllPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.gottenAllPaymentData)
    const OfferPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.getOfferPaymentData)
    const AdvertPaymentTrans = useSelector((state)=> state?.reducer?.GetPaymentSlice?.getAdvertPaymentData)
    // console.log('all advert payment ', AdvertPaymentTrans)

    useEffect(()=>{
        const calcPayment = () =>{
            let amountSum = 0
            for (let i=0; i<AllPaymentTrans?.length; i++){
                amountSum += Number(AllPaymentTrans[i].amount)
            }
            const firstMonth = format(new Date(AllPaymentTrans[0].created_at), 'MMMM yyyy');
            const lastMonth = format(new Date(AllPaymentTrans[AllPaymentTrans.length-1].created_at), 'MMMM yyyy');
            setTotalFirstMonth(firstMonth)
            setTotalLastMonth(lastMonth)
            setTotalPayment(amountSum)
        }
        calcPayment()
    }, [AllPaymentTrans])
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Scout Deals'},
        {id: 3, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
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
            await dispatch(GetAllPaymentApi())
            await dispatch(GetOfferPaymentApi())
            await dispatch(GetAdvertPaymentApi())
        }
        paymentCall()
    },[])


  return (
    <div  className='Scoutpage_contents'>
    <div className='Scoutpage_AccountLogout_div'>
        <p className='Scoutpage_AccountWord'>Account</p>
        <p className='Scoutpage_AccountWord' style={{cursor:'pointer'}} onClick={handleLogout}>Logout <RxExit /></p>
    </div>
    <div className='Scoutpage_LinkPages'>
       {data.map((each, index)=>(
         <NavLink to={each?.pathTo} key={index} className={({isActive})=> (isActive ? 'Scoutpage_Profileactivepage':'Scoutpage_Profilepage')}>{each?.pathName}</NavLink>
        ))}
    </div>
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
            <Link  className='Scoutpage_transaction_Linkotherpages'>View All Transactions</Link>
            </div>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Adverts Transaction</p>
                
                <div className='Scoutpage_TransGetpaid_dateandamt'>
                {AdvertPaymentTrans.map((each,index)=>(
                <div key={index} className='Scoutpage_Getpaid_dateSec'>
                    <p className='Scoutpage_Getpaid_monthandyear'>{format(new Date(each?.created_at), 'MMMM yyyy')}</p>
                <p className='Scoutpage_Getpaid_monthandyear'>${each?.amount}</p>
                </div>
                ))}</div>
            
            </div>
            <Link  className='Scoutpage_transaction_Linkotherpages'>View All Transactions</Link>
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
        </div>
    </div>
  )
}

export default PlayerPayment