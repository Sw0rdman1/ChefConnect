import LogInForm from '@/components/auth/LogInForm'
import { View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

const LogInScreen = () => {
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

        </View>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})