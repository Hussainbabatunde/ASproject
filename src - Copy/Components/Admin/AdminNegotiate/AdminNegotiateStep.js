import React, { useState } from 'react';
import AdminNegotiateAllNegotiate from './AdminNegotiateAllNegotiate';
import AdminNegotiateSuspended from './AdminNegotiateSuspended';
import AdminNegotiateClosed from './AdminNegotiateClosed';
import AdminNegotiateTerminated from './AdminNegotiateTerminated';

const AdminNegotiateStep = () => {
    const [step, setStep] = useState(1);

    const handleAllNegotiate = () => {
        setStep(1)
    }

    const handleSuspended = () => {
        setStep(2)
    }

    const handleClosed = () => {
        setStep(3)
    }

    const handleTerminated = () => {
        setStep(4)
    }
    switch(step){
        case 1: 
    return(
        <AdminNegotiateAllNegotiate handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 2: 
    return(
        <AdminNegotiateSuspended  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 3: 
    return(
        <AdminNegotiateClosed  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 4: 
    return(
        <AdminNegotiateTerminated  handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )

    }
}

export default AdminNegotiateStep