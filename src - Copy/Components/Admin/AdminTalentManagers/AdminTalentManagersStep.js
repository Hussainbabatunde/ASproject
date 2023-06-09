import React, { useState } from 'react'
import AdminTalentManagerAllManagers from './AdminTalentManagerAllManagers';
import AdminTalentManagerSuspended from './AdminTalentManagerSuspended';

const AdminTalentMangersStep = () => {
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
        <AdminTalentManagerAllManagers handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )
        case 3: 
    return(
        <AdminTalentManagerSuspended handleAllNegotiate={handleAllNegotiate} handleSuspended={handleSuspended} handleClosed={handleClosed} handleTerminated={handleTerminated} />
        )

    }
}

export default AdminTalentMangersStep