import AppleSignButton from '@/components/auth/AppleSignButton'
import LogInForm from '@/components/auth/LogInForm'
import { Text, View } from '@/components/ui/Themed'
import { router } from 'expo-router';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { useColors } from '@/hooks/useColors';
import Banner from '@/components/auth/Banner';
import SwitchForm from '@/components/auth/SwitchForm';

const LogInScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Banner source={require('../../assets/images/auth/login-banner.jpg')} height={250} />
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