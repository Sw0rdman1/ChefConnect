import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MainScreen</Text>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})