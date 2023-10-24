import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';

const Notification = () =>{
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    console.log('host name ',window.location.hostname)

    useEffect(() => {
        const pusher = new Pusher('myKey', {
          cluster: 'eu2',
          wsHost: 'localhost',
          wssHost: 'localhost',
          wsPort: 6001,
          disableStats: true,
          encrypted: true, // Use wss for secure WebSocket connection
        });

        const channel = pusher.subscribe(`offer.${userId}`);

    channel.bind('OfferNotificationEvent', (data) => {
      // Handle the incoming event data here
      console.log('Received event:', data);
    });

    return () => {
        // Clean up the Pusher connection when the component unmounts
        pusher.unsubscribe(`offer.${userId}`);
        pusher.disconnect();
      };
    }, []);
    return(
        <div className='my-5 min-h-[50vh] bg-green'>
            <div className='w-[60%] bg-white mx-auto'>
                <div className='flex items-center'>
            <img src={require('../../assets/imgRecipient.png')}  className='useTable_ImageRecipient' />
            <p className='font-bold'>Scout commented on your page.</p>
            </div>
            </div>
        </div>
    )
}

export default Notification;