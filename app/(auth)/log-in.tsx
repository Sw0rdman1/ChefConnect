import AppleSignButton from '@/components/auth/AppleSignButton'
import LogInForm from '@/components/auth/LogInForm'
import { Text, View } from '@/components/ui/Themed'
import { router } from 'expo-router';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { useColors } from '@/hooks/useColors';
import Banner from '@/components/auth/Banner';

const LogInScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Banner
                source={require('../../assets/images/auth/login-banner.jpg')}
                height={250}
            />
            <LogInForm />
            <AppleSignButton isLogin />
            <Text style={styles.registration}>
                Don't have an account?{' '}
                <Text onPress={() => { router.push('registration') }} style={{ color: tint, fontWeight: '700' }}>
                    Sign Up
                </Text>
            </Text>

        </View>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    registration: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '700',
    },
})