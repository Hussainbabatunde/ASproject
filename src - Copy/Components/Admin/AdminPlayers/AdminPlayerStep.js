import React, { useState } from 'react';
// import AdminNegotiateTerminated from './AdminNegotiateTerminated';
import AdminPlayerAllNegotiate from './AdminPlayersAllPlayers';
import AdminPlayersReview from './AdminPlayersReview';
import AdminPlayersSuspended from './AdminPlayersSuspended';

const AdminPlayerStep = () => {
    const [step, setStep] = useState(1);

    const handleAllNegotiate = () => {
        setStep(1)
    }

    const handleSuspended = () => {
        setStep(3)
    }

    const handleClosed = () => {
        setStep(2)
    }

    const handleTerminated = () => {
        // setStep(4)
    }
    switch(step){
        case 1: 
    return(
        <AdminPlayerAllNegotiate handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 2: 
    return(
        <AdminPlayersReview  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 3: 
    return(
        <AdminPlayersSuspended  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
    //     case 4: 
    // return(
    //     <AdminNegotiateTerminated  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
    //     )

    }
}

export default AdminPlayerStep