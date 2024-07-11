import { Text, View } from '@/components/ui/Themed'
import { useAuth } from '@/context/AuthContext'
import { useColors } from '@/hooks/useColors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ActionProps {
    icon: React.ComponentProps<typeof Ionicons>['name']
    text: string,
    onPressHandler: () => void
}

const Action: React.FC<ActionProps> = ({ icon, text, onPressHandler }) => {
    const { text: textColor, tint } = useColors()

    return (
        <TouchableOpacity onPress={onPressHandler} style={styles.actionContainer}>
            <View style={styles.leftSide}>
                {icon && <Ionicons name={icon} size={28} color={tint} />}
                <Text style={styles.actionName}>{text}</Text>
            </View>
            <View style={styles.rightSide}>
                <Ionicons name="chevron-forward" size={28} color={textColor} />
            </View>

        </TouchableOpacity>

    )
}

const ProfileActions = () => {
    const { signOut } = useAuth()

    const goToPageHandler = (page: string) => {
        router.push(page)
    }

    const logOutHandler = () => {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Action icon="person-outline" text="Edit profile" onPressHandler={goToPageHandler.bind(null, 'EditProfile')} />
            <Action icon="settings-outline" text="Settings" onPressHandler={goToPageHandler.bind(null, 'Settings')} />
            <Action icon="log-out-outline" text="Log out" onPressHandler={logOutHandler} />
        </View>
    )
}

export default ProfileActions

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    actionContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionName: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '500',
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})