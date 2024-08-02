import { Text, TextInput, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface MessageInputProps {
    chatID: string
}

const MessageInput: React.FC<MessageInputProps> = ({ chatID }) => {
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const { tint, backgroundDarker } = useColors()
    const { bottom } = useSafeAreaInsets()

    const sendMessageHandler = async () => {
        if (text.trim() === '') return

        setText('')
    }

    const onBlurHandler = () => {
        setIsTyping(false)
    }

    const onFocusHandler = () => {
        setIsTyping(true)
    }



    return (
        <View style={[styles.container, { paddingBottom: isTyping ? 15 : bottom }]}>
            <TextInput
                value={text}
                onChangeText={setText}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                placeholder="Type a message"
                style={[styles.input, { backgroundColor: backgroundDarker }]}
                multiline
                onEndEditing={sendMessageHandler}
                autoCapitalize='sentences'
                enterKeyHint='send'
            />
            <TouchableOpacity onPress={sendMessageHandler}>
                <Ionicons name="send" size={24} color={tint} />
            </TouchableOpacity>
        </View>
    )
}

export default MessageInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
    },
})