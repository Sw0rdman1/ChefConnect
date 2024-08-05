import { useApp } from '@/context/AppContext'
import { useColors } from '@/hooks/useColors'
import { Message as MessageEntity } from '@/models/Message'
import { StyleSheet, Text, View } from 'react-native'

interface MessageProps {
    message: MessageEntity
}

const BORDER_RADIUS = 15

const Message: React.FC<MessageProps> = ({ message }) => {
    const { text, tint } = useColors()
    const { user } = useApp()
    const isMyMessage = message.userId === user?.id

    return (
        <View style={[styles.container,
        {
            shadowColor: isMyMessage ? tint : text,
            borderBottomRightRadius: isMyMessage ? 0 : BORDER_RADIUS,
            borderBottomLeftRadius: isMyMessage ? BORDER_RADIUS : 0,
            backgroundColor: isMyMessage ? tint : "lightgray",
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start'
        }
        ]}>
            <Text style={[styles.text, { color: isMyMessage ? 'white' : text }]}>{message.text}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: BORDER_RADIUS,
        maxWidth: "80%",
        alignSelf: "flex-start",
        margin: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        fontSize: 18,
    },
})