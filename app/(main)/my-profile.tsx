import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

const MyProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MyProfileScreen</Text>
        </View>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})