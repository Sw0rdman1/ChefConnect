import Button from '@/components/ui/Button'
import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const WelcomeScreen = () => {
    const { tintBackground, tint } = useColors()
    const { top } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { backgroundColor: tintBackground }]}>
            <View style={[styles.bannerContainer, { paddingVertical: top }]}>
                <Image
                    source={require('../../assets/images/auth/banner.jpg')}
                    style={styles.bannerImage}
                />
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formChildContainer}>
                    <Text style={[styles.title]}>
                        <Text>Bringing </Text>
                        <Text style={{ color: tint }}>Chefs </Text>
                        <Text>Closer, One Recipe at a Time.</Text>
                    </Text>
                    <Text style={styles.slogan}>
                        The social network for passionate cooks and food enthusiasts.
                    </Text>
                    <Link href={"log-in"} asChild>
                        <Button text="Get Started" />
                    </Link>
                </View>
            </View>
        </View >
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bannerContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: 10,
    },
    bannerImage: {
        width: '100%',
        aspectRatio: 1,
    },
    formContainer: {
        flexGrow: 1,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderTopStartRadius: 200,
        borderTopEndRadius: 200,
        overflow: 'hidden',
    },
    formChildContainer: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        gap: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 800,
    },
    slogan: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        fontWeight: 400,
    },
})