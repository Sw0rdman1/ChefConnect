import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Chat } from '@/models/Chat'
import { Text } from '@/components/ui/Themed'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Avatar from '@/components/ui/Avatar'
import { router } from 'expo-router'
import { useColors } from '@/hooks/useColors'

interface ChatHeaderProps {
    selectedChat: Chat
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => {
    const { top } = useSafeAreaInsets()
    const { tint } = useColors()

    const goBackHandler = () => {
        router.back()
    }

    return (
        <BlurView
            intensity={100}
            style={[styles.container, { paddingTop: top + 20 }]}
        >
            <View style={styles.left}>
                <TouchableOpacity onPress={goBackHandler}>
                    <Ionicons name="chevron-back" size={28} color={tint} />
                </TouchableOpacity>
                <Avatar size={35} source={selectedChat.participant.profilePicture} />
                <Text style={styles.title}>{selectedChat.participant.displayName}</Text>
            </View>
        </BlurView>
    )
}

export default ChatHeader

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    left: {
        flex: 1,
        gap: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 5,
    },
})