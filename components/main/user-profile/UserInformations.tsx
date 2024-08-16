import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import User from '@/models/User'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity } from 'react-native'

const BIOGRAPHY_ICON = require("../../../assets/images/main/biography.png")

interface UserInformationsProps {
    user: User
    userCardHeight: number
    imageHeight: number
}

const UserInformations: React.FC<UserInformationsProps> = ({ user, userCardHeight, imageHeight }) => {
    const { tint, text } = useColors()

    const boxShadow = {
        shadowColor: text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

    const openChatHandler = () => {
        // router.push(`/(inbox)/${userID}`);
    }

    return (
        <View style={[styles.userCard, boxShadow, { height: userCardHeight, marginTop: imageHeight - userCardHeight / 2 }]}>
            <Text style={styles.name}>
                {user.displayName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image
                    source={BIOGRAPHY_ICON}
                    style={styles.icon}
                />
                <Text style={styles.bio}>
                    "{user.bio}"
                </Text>
            </View>
            <TouchableOpacity
                onPress={openChatHandler}
                style={[styles.chatButton, boxShadow, { backgroundColor: tint, top: 22.5 }]}
            >
                <Ionicons name="chatbubble-ellipses" size={26} color={"white"} />
            </TouchableOpacity>
        </View>
    )
}

export default UserInformations

const styles = StyleSheet.create({
    userCard: {
        padding: 15,
        width: '100%',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        zIndex: 1
    },
    chatButton: {
        height: 55,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
        position: 'absolute',
        right: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
        fontWeight: '600',
        color: 'gray'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
})