import { StyleSheet, View } from 'react-native'
import { Chat } from '@/models/Chat'
import { Text } from '@/components/ui/Themed'

interface ChatHeaderProps {
    selectedChat: Chat
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => {
    console.log(selectedChat);

    return (
        <View>
            <Text>ChatHeader</Text>
        </View>
    )
}

export default ChatHeader

const styles = StyleSheet.create({})