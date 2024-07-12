import { StyleSheet } from 'react-native'
import { View } from '@/components/ui/Themed'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/context/ToastNotificationContext'
import { supabase } from '@/config/supabase'
import { Formik } from 'formik'
import { registrationValidationSecondStep } from '@/utils/validations'
import Button from '@/components/ui/Button'
import { calculateStatus } from '@/utils/helpers'
import { PasswordInput } from './EditProfileInputs'
import { router } from 'expo-router'

const initialValues = {
    newPassword: '',
    confirmPassword: '',
}

const ChangePasswordForm = () => {
    const { user } = useApp()
    const { showToast } = useToast()


    const onSubmitHandler = async (values: typeof initialValues) => {
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registrationValidationSecondStep}
            onSubmit={(values) => { onSubmitHandler(values) }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <PasswordInput
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                        error={errors.newPassword}
                        status={calculateStatus(errors.newPassword, touched.newPassword, values.newPassword)}
                    />
                    <PasswordInput
                        placeholder='Confirm Password'
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        status={calculateStatus(errors.confirmPassword, touched.confirmPassword, values.confirmPassword)}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={Object.keys(errors).length > 0}
                            onPress={handleSubmit}
                            text={"Change Password"}
                        />
                    </View>

                </View>
            )}
        </Formik>
    )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
        gap: 45,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 10,
        marginHorizontal: 20,
    },
})