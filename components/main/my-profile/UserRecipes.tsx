import { Text, View } from '@/components/ui/Themed'
import { useAuth } from '@/context/AuthContext'
import { useColors } from '@/hooks/useColors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ActionProps {
    icon: React.ComponentProps<typeof Ionicons>['name']
    text: string,
    pageToGo: string
}

const Action: React.FC<ActionProps> = ({ icon, text, pageToGo }) => {
    const { text: textColor, tint } = useColors()

    const handlePress = () => {
        router.push(pageToGo)
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.actionContainer}>
            <View style={styles.leftSide}>
                {icon && <Ionicons name={icon} size={28} color={tint} />}
                <Text style={[styles.actionName, { color: textColor }]}>
                    {text}
                </Text>
            </View>
            <View style={styles.rightSide}>
                <Ionicons name="chevron-forward" size={28} color={textColor} />
            </View>

        </TouchableOpacity>

    )
}

const UserRecipes = () => {

    return (
        <View style={styles.container}>
            <Action text='My recipes' icon='book-outline' pageToGo='my-recipes' />
            <Action text='Saved recipes' icon='bookmark-outline' pageToGo='saved-recipes' />
        </View>
    )
}

export default UserRecipes

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
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