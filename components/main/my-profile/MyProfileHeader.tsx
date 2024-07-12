import Avatar from '@/components/ui/Avatar'
import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'
import { useApp } from '@/context/AppContext';

const MyProfileHeader = () => {
    const { text } = useColors()
    const { user } = useApp()

    const goBackHandler = () => {
        router.back()
    }

    if (!user) return null

    return (
        <>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={goBackHandler}>
                    <Ionicons name="chevron-back" size={32} color={text} />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.userInformations}>
                <Avatar size={80} source={user.profilePicture} />
                <View style={styles.userDetails}>
                    <Text style={styles.displayName}>{user.displayName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
        </>
    )
}

export default MyProfileHeader

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 40,
    },
    title: {
        fontSize: 42,
        fontWeight: 700,
    },
    userInformations: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
    },
    userDetails: {
        marginLeft: 10,
        gap: 2,
    },
    displayName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 18,
        color: '#777',
    },

})