import Avatar from '@/components/ui/Avatar'
import { Text } from '@/components/ui/Themed'
import { useApp } from '@/context/AppContext'
import { useColors } from '@/hooks/useColors'
import User from '@/models/User'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface AuthorInfoProps {
    user: User
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ user }) => {
    const { background } = useColors()
    const router = useRouter()
    const { user: currentUser } = useApp()

    const isYourProfile = user.id === currentUser?.id

    const openUserProfileHandler = () => {
        if (!isYourProfile) {
            router.push(`/(main)/(user)/${user.id}`)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Image
                    source={require("../../../assets/images/main/chef.png")}
                    style={styles.icon}
                />
                <Text style={styles.labelText}>
                    Recipe by
                </Text>
            </View>
            <TouchableOpacity
                onPress={openUserProfileHandler}
                style={[styles.userCard, { backgroundColor: `${background}90` }]}
            >
                <Avatar size={25} source={user.profilePicture} />
                <Text style={styles.name}>
                    {isYourProfile ? "You" : user.displayName}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthorInfo

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    labelText: {
        fontSize: 18,
        color: "gray",
        fontWeight: "bold",
        paddingRight: 2,
    },
    userCard: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingRight: 10,
        borderRadius: 20,
        marginLeft: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 3,
        elevation: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
})