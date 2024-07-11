import Avatar from '@/components/ui/Avatar'
import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'

const MyProfileHeader = () => {
    const { text } = useColors()

    const goBackHandler = () => {
        router.back()
    }

    return (
        <>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={goBackHandler}>
                    <Ionicons name="chevron-back" size={32} color={text} />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.userInformations}>
                <Avatar size={80} />
                <View style={styles.userDetails}>
                    <Text style={styles.displayName}>Bozidar Vujasinovic</Text>
                    <Text style={styles.email}>vujasinovicb2019@gmail.com</Text>
                </View>
            </View>
        </>
    )
}

export default MyProfileHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
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
        backgroundColor: 'transparent'
    },
    userDetails: {
        marginLeft: 10,
        backgroundColor: 'transparent',
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