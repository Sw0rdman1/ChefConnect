import { Message as MessageEntity } from '@/models/Message'
import { StyleSheet, Text, View } from 'react-native'

interface MessageProps {
    message: MessageEntity
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message.text}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",
        alignSelf: "flex-start",
        backgroundColor: "#f5f5f5",
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
    },
})