import { StyleSheet } from 'react-native'
import { Text, View } from '../ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Formik } from 'formik'
import { loginValidation } from '@/utils/validations'
import { EmailInput } from './AuthInputs'

const initialValues = {
    email: '',
    password: '',
}

const LogInForm = () => {
    const { tint } = useColors()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={(values) => {
                console.log(values);
                // handle form submission
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={[styles.title, { color: tint }]}>Welcome Back!</Text>
                    <EmailInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        error={touched.email ? errors.email : ''}
                    />

                </View>
            )}
        </Formik >
    )
}

export default LogInForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
    }
})