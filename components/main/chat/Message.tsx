import { useApp } from '@/context/AppContext'
import { useColors } from '@/hooks/useColors'
import { Message as MessageEntity } from '@/models/Message'
import { generateTimeString, getTime } from '@/utils/time'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

interface MessageProps {
    message: MessageEntity
}

const BORDER_RADIUS = 15

const Message: React.FC<MessageProps> = ({ message }) => {
    const { text, tint, backgroundDarker } = useColors()
    const { user } = useApp()
    const isMyMessage = message.userId === user?.id

    return (
        <View style={[styles.container,
        {
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
            alignItems: isMyMessage ? 'flex-end' : 'flex-start',
        }
        ]}>

            <View style={[styles.messageContainer,
            {
                shadowColor: isMyMessage ? tint : text,
                borderBottomRightRadius: isMyMessage ? 0 : BORDER_RADIUS,
                borderBottomLeftRadius: isMyMessage ? BORDER_RADIUS : 0,
                backgroundColor: isMyMessage ? tint : backgroundDarker,
            }
            ]}>
                <Text style={[styles.text, { color: isMyMessage ? 'white' : text }]}>{message.text}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.time}>{getTime(message.createdAt)}</Text>
                {isMyMessage &&
                    <Ionicons
                        style={styles.seenIcon}
                        name="checkmark-done-sharp"
                        size={18}
                        color={message.isRead ? tint : "gray"}
                    />
                }
            </View>
        </View>


    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginHorizontal: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    messageContainer: {
        padding: 10,
        borderRadius: BORDER_RADIUS,
        maxWidth: "80%",
        flexDirection: "row",
    },
    text: {
        fontSize: 18,
    },

    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        gap: 5,
    },
    time: {
        fontSize: 12,
        color: "gray",
    },
    seenIcon: {
        justifyContent: "center",
        alignSelf: "flex-end",
    },
})