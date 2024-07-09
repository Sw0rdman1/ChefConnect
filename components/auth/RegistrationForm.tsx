import { useState } from 'react'
import FirstStepRegistration from './FirstStepRegistration'
import SecondStepRegistration from './SecondStepRegistration'


const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1)
    return (
        <>
            {currentStep === 1 ?
                <FirstStepRegistration nextStepHandler={() => setCurrentStep(2)} /> :
                <SecondStepRegistration />
            }
        </>
    )
}

export default RegistrationForm

