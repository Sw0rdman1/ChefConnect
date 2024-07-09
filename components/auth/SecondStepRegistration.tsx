import { Formik } from "formik";
import { registrationValidation } from "@/utils/validations";
import { Text, View } from "../ui/Themed";
import { PasswordInput } from "./AuthInputs";
import { calculateStatus } from "@/utils/helpers";
import { StyleSheet } from "react-native";
import Button from "../ui/Button";

const initialValues = {
    password: '',
    confirmPassword: '',
}

const SecondStepRegistration = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registrationValidation}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleChange, handleBlur, values, errors, touched }) => (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Almost there!</Text>
                        <Text style={styles.subtitle}>
                            Now we need a password to secure your account.
                        </Text>
                    </View>
                    <PasswordInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        error={errors.password}
                        status={calculateStatus(errors.password, touched.password, values.password)}
                    />
                    <PasswordInput
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        status={calculateStatus(errors.confirmPassword, touched.confirmPassword, values.confirmPassword)}
                        placeholder="Confirm Password"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => console.log('submit')}
                            text={"Create Account"}
                        />
                    </View>

                </View>
            )}
        </Formik>
    )
}

export default SecondStepRegistration


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