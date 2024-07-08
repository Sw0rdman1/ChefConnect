import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>WelcomeScreen</Text>
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
})