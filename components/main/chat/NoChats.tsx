import { Text, View } from '@/components/ui/Themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

const BIOGRAPHY_ICON = "../../../assets/images/main/empty-inbox.png"

const NoChats = () => {
    return (
        <View style={styles.container}>
            <Image source={require(BIOGRAPHY_ICON)} style={styles.image} />
            <Text style={styles.text}>No chats yet</Text>

        </View>
    )
}

export default NoChats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginTop: 150,
        width: 200,
        height: 200
    },
    text: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray'
    }
})