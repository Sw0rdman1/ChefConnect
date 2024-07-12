import { StyleSheet } from 'react-native'
import { View } from '@/components/ui/Themed'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/context/ToastNotificationContext'
import { supabase } from '@/config/supabase'
import { Formik } from 'formik'
import { editProfileValidation } from '@/utils/validations'
import Button from '@/components/ui/Button'
import { calculateStatus } from '@/utils/helpers'
import { DisplayNameInput, EmailInput } from './EditProfileInputs'

const noUserInitialValues = {
    email: '',
    displayName: '',
    id: '',
    profilePicture: '',
    updated_at: new Date()
}

const EditProfileForm = () => {
    const { user } = useApp()
    const { showToast } = useToast()
    const initialValues = user ? { ...user } : noUserInitialValues


    const onSubmitHandler = async (values: typeof initialValues) => {
        const { email, displayName, id, profilePicture, updated_at } = values
        try {

            const updates = {
                id,
                displaty_name: displayName,
                profile_picture: profilePicture,
                email,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('users').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast({
                    text: error.message,
                    severity: 'error'
                })
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={editProfileValidation}
            onSubmit={(values) => { onSubmitHandler(values) }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
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
                            text={"Edit Profile"}
                        />
                    </View>

                </View>
            )}
        </Formik>
    )
}

export default EditProfileForm

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingTop: 30,
        gap: 25,
    },
    buttonContainer: {
        marginTop: 10,
        marginHorizontal: 20,
    },
})