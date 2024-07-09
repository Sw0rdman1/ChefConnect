import { StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { registrationValidation } from '@/utils/validations'
import { DisplayNameInput, EmailInput } from './AuthInputs'
import { calculateStatus } from '@/utils/helpers'
import Button from '../ui/Button'
import { Text, View } from '../ui/Themed'

interface FirstStepProps {
    nextStepHandler: () => void
}

const initialValues = {
    email: '',
    displayName: '',
}

const FirstStepRegistration: React.FC<FirstStepProps> = ({ nextStepHandler }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registrationValidation}
            onSubmit={nextStepHandler}
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