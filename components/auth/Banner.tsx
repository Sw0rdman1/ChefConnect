import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

interface BannerProps {
    source: string
    height: number
}

const Banner: React.FC<BannerProps> = ({ source, height }) => {
    return (
        <View style={[styles.imageContainer, { height }]}>
            <View style={styles.imageChildContainer}>
                <Image
                    source={source}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    imageContainer: {
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
})