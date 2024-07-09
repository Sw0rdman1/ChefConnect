import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
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
                        <Text style={{ color: tint }}>Connecting Chefs</Text>
                        <Text> One Recipe at </Text>
                    </Text>
                    <Text style={styles.title}>A Time</Text>
                </View>
            </View>
        </View>
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
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 800,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: 800,
        textAlign: 'center',
    },

})