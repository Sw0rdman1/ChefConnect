import { Dimensions, StyleSheet } from 'react-native'
import { Text, View } from '@/components/ui/Themed'
import { Image } from 'expo-image'
import { useColors } from '@/hooks/useColors'
import { Link } from 'expo-router'
import Button from '@/components/ui/Button'

const { height, width } = Dimensions.get('window')

const SuccessScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/auth/success-banner.jpg')}
                style={styles.image}
                contentFit='cover'
            />
            <View style={styles.textContainer}>
                <View style={styles.textChildContainer}>
                    <Text style={styles.title}>Great Job Chief!</Text>
                    <Text style={styles.subtitle}>Welcome to <Text style={[styles.subtitle, { color: tint }]}>ChefConnect</Text></Text>
                    <Text style={styles.verifyEmail}>
                        Just one more thing, we sent you an email to verify your account.
                        Please check your inbox and complete your registration, so you can start sharing your favorite recipes with the world!
                    </Text>

                    <Link href={"log-in"} asChild>
                        <Button text="Go to Log In" />
                    </Link>

                    <Text style={styles.verifyEmail}>
                        After verifying your email, click this button to log in.
                    </Text>

                </View>
            </View>
        </View>

    )
}

export default SuccessScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        aspectRatio: 1,
        zIndex: -1,
    },
    textContainer: {
        height: height - width,
        marginTop: width - 50,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderTopStartRadius: 250,
        borderTopEndRadius: 250,
        overflow: 'hidden',
    },
    textChildContainer: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        gap: 15,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    verifyEmail: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    }
})