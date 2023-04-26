import React, { useState } from 'react'
import AdminScoutsAllScouts from './AdminScoutsAllScouts';
import AdminScoutsSuspended from './AdminScoutsSuspended';

const AdminScoutsStep = () => {
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
        <AdminScoutsAllScouts handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 3: 
    return(
        <AdminScoutsSuspended handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )

    }
}

export default AdminScoutsStep