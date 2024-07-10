import { StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { DisplayNameInput, EmailInput } from './AuthInputs'
import { calculateStatus } from '@/utils/helpers'
import Button from '../ui/Button'
import { Text, View } from '../ui/Themed'
import { registrationValidationFirstStep } from '@/utils/validations'

interface FirstStepProps {
    nextStepHandler: (values: any) => void
}

const initialValues = {
    email: '',
    displayName: '',
}

const FirstStepRegistration: React.FC<FirstStepProps> = ({ nextStepHandler }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registrationValidationFirstStep}
            onSubmit={(values) => nextStepHandler(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome!</Text>
                        <Text style={styles.subtitle}>
                            Let's get you started with an account. First we will need your name and email adress.
                        </Text>
                    </View>
                    <DisplayNameInput
                        onChangeText={handleChange('displayName')}
                        onBlur={handleBlur('displayName')}
                        value={values.displayName}
                        error={errors.displayName}
                        status={calculateStatus(errors.displayName, touched.displayName, values.displayName)}
                    />
                    <EmailInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        error={errors.email}
                        status={calculateStatus(errors.email, touched.email, values.email)}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={Object.keys(errors).length > 0 || Object.keys(touched).length === 0}
                            onPress={handleSubmit}
                            text={"Next Step"}
                        />
                    </View>

                </View>
            )}
        </Formik>
    )
}

export default FirstStepRegistration

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 30,
        gap: 25,
    },
    textContainer: {
        gap: 10,
        marginLeft: 10,

    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: 'gray',
    },
    buttonContainer: {
        marginTop: 10,
        marginHorizontal: 20,
    },
})