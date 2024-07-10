import { useState } from 'react'
import FirstStepRegistration from './FirstStepRegistration'
import SecondStepRegistration from './SecondStepRegistration'


const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [firstStepData, setFirstStepData] = useState({
        email: '',
        displayName: '',
    })

    const nextStepHandler = (values: { email: string, displayName: string }) => {
        setFirstStepData(values)
        setCurrentStep(2)
    }

    return (
        <>
            {currentStep === 1 ?
                <FirstStepRegistration nextStepHandler={nextStepHandler} /> :
                <SecondStepRegistration firstStepData={firstStepData} />
            }
        </>
    )
}

export default RegistrationForm

