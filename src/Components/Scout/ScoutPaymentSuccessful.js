import { Skeleton } from '@mui/material';
import { id } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';


export default function ScoutPaymentSuccess () {
    const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [gottenInfo, setGottenInfo] = useState(null)
  const [loading, setLoading] = useState(false)
    // console.log(params.get('user_id'), params.get('payment'))

    useEffect(()=>{
        const user_id = params.get('user_id')
        const payment = params.get('payment')
        const tokengot = localStorage.getItem("token");
        const infoneeded = `Bearer ${tokengot}`;
        console.log(user_id, payment)
        const getDetails = async() =>{
            setLoading(true)
            await fetch(`https://ko.bcodestech.com/api/successful-payment/${user_id}/${payment}`)
            .then((res)=> res.json())
            .then((response)=>{
                // console.log('response ',response)
                setGottenInfo(response)
            })
            .catch((error)=>{
                console.log(error)
            })
            setLoading(false)
        }
        getDetails()
    },[])
    return (
        <div className='flex justify-center min-h-[80vh] items-center'>
            <div className='bg-white shadow-xl p-5'>
                <p className='text-2xl font-bold'>Payment Successful</p>
                <p>Transaction detail</p>
                <div className='flex my-5'>
                <p className='mr-2'> Player Name:</p>
                {loading? <Skeleton variant="circular" width={35} height={32} /> :<img src={gottenInfo?.plus?.player?.profile_pics}  className='useTable_ImageRecipient' />}
                <p className='mr-2'>{loading?  <Skeleton variant="rounded" width={105} height={22} /> : gottenInfo?.plus?.player?.firstname}</p>
                <p>{loading?  <Skeleton variant="rounded" width={105} height={22} /> :gottenInfo?.plus?.player?.surname}</p>
                </div>

                <div className='flex my-5'>
                <p className='mr-2'> Offer title:</p>
                <p className='mr-2'>{loading?  <Skeleton variant="rounded" width={105} height={22} /> :gottenInfo?.plus?.offer?.name}</p>
                </div>

                <div className='flex my-5'>
                <p className='mr-2'> Offer Detail:</p>
                <p className='mr-2'>{loading?  <Skeleton variant="rounded" width={105} height={22} /> :gottenInfo?.plus?.offer?.detail}</p>
                </div>

                <div className='flex my-5'>
                <p className='mr-2'> Amount paid:</p>
                <p className='mr-2'>{loading?  <Skeleton variant="rounded" width={105} height={22} /> :gottenInfo?.plus?.offer?.value}</p>
                </div>
                <div className='flex justify-center'>
                <Link to='/afrisport/scout/deal'>
                <button className='bg-green-700 text-white py-2 px-3 rounded'>Done</button>
                </Link>
                </div>
                
            </div>
        </div>
    )
}