import { ActivityIndicator, StyleSheet } from 'react-native'
import { View } from './Themed'
import { useColors } from '@/hooks/useColors'

const LoadingScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={tint} />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})