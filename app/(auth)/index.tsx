import Button from '@/components/ui/Button'
import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get('window');

const WelcomeScreen = () => {
    const { tintBackground, tint } = useColors()
    const { top } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { backgroundColor: tintBackground }]}>
            <View style={[styles.bannerContainer]}>
                <Image
                    source={require('../../assets/images/auth/banner.jpg')}
                    style={styles.bannerImage}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Bringing
                    <Text style={{ color: tint }}> Chefs </Text>
                    Closer, One Recipe
                </Text>
                <Text style={[styles.title, { marginBottom: 10 }]}>
                    at a Time.
                </Text>
                <Text style={styles.slogan}>
                    The social network for passionate cooks and food enthusiasts.
                </Text>
                <Link href={"/log-in"} asChild>
                    <Button text="Get Started" />
                </Link>
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
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
    },
    bannerImage: {
        width,
        height
    },
    textContainer: {
        backgroundColor: "transparent",
        justifyContent: 'center',
        width: '80%',
        position: 'absolute',
        bottom: 60,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 800,
    },
    slogan: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 400,
        marginBottom: 30,
    },
})