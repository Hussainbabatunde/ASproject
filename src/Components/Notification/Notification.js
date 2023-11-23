import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import axios from 'axios';
import { useQuery } from 'react-query';


const client = axios.create({baseURL: 'https://ko.bcodestech.com/api/'})

const getNotification = () => 
{
  let token = localStorage.getItem('token')
    // return axios.get(`http://localhost:8000/api/get-offer-notification/${heroId}`) 
    const options = { url: 'offer-notification', method: 'GET'   }
    client.defaults.headers.common.Authorization = `Bearer ${token}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}

const Notification = () =>{
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    console.log('host name ',window.location.hostname)

    const { isLoading, data, isError, error, refetch, onSuccess, onError  } = useQuery('recent-offer', getNotification, { 
      cacheTime: 0, 
      refetchOnMount: true, 
      refreshOnWindowFocus: true,  
      refreshInterval: 300,
      refreshIntervalInBackground: true,
      enable: true,
    })

    console.log("***********************8")
      console.log('notification 2 ',data)
      console.log("***********************8")
    
    return(
        <div className='my-5 min-h-[50vh] bg-green'>
            <div className='w-[60%] bg-white mx-auto'>
                {data?.data?.toReversed()?.map((each, index)=>(
                <div key={index} className='flex items-center mt-2 mb-2'>
            <img src={each?.offer?.sender?.profile_pics}  className='useTable_ImageRecipient' />
            <p className='font-bold'>{each?.offer?.sender?.firstname} {each?.offer?.sender?.surname} pitched an offer.</p>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Notification;