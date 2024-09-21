import AppleSignButton from '@/components/auth/AppleSignButton'
import Banner from '@/components/auth/Banner'
import RegistrationForm from '@/components/auth/RegistrationForm'
import SwitchForm from '@/components/auth/SwitchForm'
import { StyleSheet, View } from 'react-native'

const REGISTRATION_BANNER = require('../../assets/images/auth/login-banner.jpg')

const RegistrationScreen = () => {
    return (
        <View style={styles.container}>
            <Banner source={REGISTRATION_BANNER} height={200} />
            <RegistrationForm />
            <AppleSignButton isLogin={false} />
            <SwitchForm isLogin={false} />
        </View>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})