import { Text, View } from '@/components/ui/Themed';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const UserProfileScreen = () => {
    const { userID } = useLocalSearchParams<{ userID: string }>();

    return (
        <View style={styles.container}>
            <Text>{userID}</Text>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})