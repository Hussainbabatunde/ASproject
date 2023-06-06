import React from 'react'
import '../Scout/ScoutPayment.css' 
import {BsFillCalendar2Fill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {AiFillBank} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { LogoutAuth } from '../../Slice/auth/Login'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import { UserLogout } from './UserLogOut'

const PlayerPayment = () => {
    const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        UserLogout()
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Scout Deals'},
        {id: 2, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
        {id: 3, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 4, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]
    const dataInfo = [
        {id: 1, date: 'Feb 23, 2023', amt:'14,500'},
        {id: 2, date: 'Feb 23, 2023', amt:'11,500'},
        {id: 3, date: 'Feb 23, 2023', amt:'4,000'}
    ]
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
                <p className='Scoutpage_PaymentEarnings_earnfigure'>N10,000</p>
            </div>
            <p className='Scoutpage_PaymentEarnings_datePayed'><BsFillCalendar2Fill className='Scoutpage_PaymentEarnings_dateIcon' /><span className='Scoutpage_PaymentEarnings_monthandyear'>February, 2023</span></p>
        </div>
        <div className='Scoutpage_TransGetpaid'>
            <div className='Scoutpage_transactionContent_holder'>
            <div className='Scoutpage_transactionContent'>
                <p className='Scoutpage_PaymentEarnings_earntext'>Transaction</p>
                
                <div className='Scoutpage_TransGetpaid_dateandamt'>
                {dataInfo.map((each,index)=>(
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