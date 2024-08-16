import Avatar from '@/components/ui/Avatar'
import { useApp } from '@/context/AppContext'
import { useMessages } from '@/context/MessagesContext'
import { useColors } from '@/hooks/useColors'
import User from '@/models/User'
import { returnChatByUsersID } from '@/services/ChatService'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface SearchResultProps {
    user: User
}
const SearchResult: React.FC<SearchResultProps> = ({ user }) => {
    const { user: currentUser } = useApp()
    const { setSelectedChatID } = useMessages()
    const { background, text } = useColors()

    const openChatHandler = async () => {
        const chatID = await returnChatByUsersID(currentUser?.id as string, user.id)
        setSelectedChatID(chatID);
        router.replace(`/(inbox)/${chatID}`)
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: background, shadowColor: text }]} onPress={openChatHandler}>
            <Avatar source={user.profilePicture} size={50} />
            <Text style={styles.name}>{user.displayName}</Text>
        </TouchableOpacity>
    )
}

export default SearchResult

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
    },
    name: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
    },
})