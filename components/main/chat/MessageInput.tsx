import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

interface MessageInputProps {
    chatID: string
}

const MessageInput: React.FC<MessageInputProps> = ({ chatID }) => {
    return (
        <View>
            <Text>MessageInput</Text>
        </View>
    )
}

export default MessageInput

const styles = StyleSheet.create({})