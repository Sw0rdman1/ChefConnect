import AppleSignButton from '@/components/auth/AppleSignButton'
import LogInForm from '@/components/auth/LogInForm'
import { View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'
import { useColors } from '@/hooks/useColors';
import Banner from '@/components/auth/Banner';
import SwitchForm from '@/components/auth/SwitchForm';

const LOGIN_BANNER = require('../../assets/images/auth/login-banner.jpg')

const LogInScreen = () => {
    return (
        <View style={styles.container}>
            <Banner source={LOGIN_BANNER} height={250} />
            <LogInForm />
            <AppleSignButton isLogin />
            <SwitchForm isLogin />
        </View>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

})