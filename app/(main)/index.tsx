import Button from '@/components/ui/Button'
import { Text, View } from '@/components/ui/Themed'
import { useAuth } from '@/context/AuthContext'
import { StyleSheet } from 'react-native'

const MainScreen = () => {
    const { signOut } = useAuth()

    return (
        <View style={styles.container}>
            <Text>MainScreen</Text>
            <Button text="Log out" onPress={signOut} />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
})