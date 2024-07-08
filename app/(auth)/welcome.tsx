import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet } from 'react-native'

const WelcomeScreen = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Welcome to
            </Text>
            <Text style={[styles.title, { color: tint }]}>
                ChefConnect
            </Text>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 24,
        color: 'gray',
    },
    title: {
        fontSize: 34,
        fontFamily: 'Merienda-Regular',
        fontWeight: 800,
    },

})