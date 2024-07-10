import { Dimensions, StyleSheet } from 'react-native'
import { Text, View } from '@/components/ui/Themed'
import { Image } from 'expo-image'
import { useColors } from '@/hooks/useColors'
import { Link } from 'expo-router'
import Button from '@/components/ui/Button'

const { height, width } = Dimensions.get('window')

const ConfirmEmailScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/auth/verify-banner.jpg')}
                style={styles.image}
                contentFit='cover'
            />
            <View style={styles.textContainer}>
                <View style={styles.textChildContainer}>
                    <Text style={styles.title}>We have problem Chef</Text>
                    <Text style={styles.subtitle}>
                        Your email is not verified yet.
                    </Text>
                    <Text style={styles.verifyEmail}>
                        We sent you an email to verify your account.
                        Please check your inbox and complete your registration, so you can start sharing your favorite recipes with the world!
                    </Text>

                    <Link href={"log-in"} asChild>
                        <Button text="Refresh app" />
                    </Link>

                    <Text style={styles.verifyEmail}>
                        After verifying your email, click this button to log in.
                    </Text>

                </View>
            </View>
        </View>

    )
}

export default ConfirmEmailScreen

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
        gap: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    verifyEmail: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    }
})