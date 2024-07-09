import AppleSignButton from '@/components/auth/AppleSignButton'
import LogInForm from '@/components/auth/LogInForm'
import { Text, View } from '@/components/ui/Themed'
import { router } from 'expo-router';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { useColors } from '@/hooks/useColors';

const LogInScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.imageChildContainer}>
                    <Image
                        source={require('../../assets/images/auth/login-banner.jpg')}
                        style={styles.image}
                    />
                </View>
            </View>
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
    imageContainer: {
        height: 250,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 250,
        borderBottomEndRadius: 250,
        overflow: 'hidden',
    },
    imageChildContainer: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    formContainer: {
        flex: 1,
        marginTop: 10,
        padding: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    registration: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '700',
    },
})