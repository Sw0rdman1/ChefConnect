import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'

const EditProfileHeader = () => {
    const { text } = useColors()

    const goBackHandler = () => {
        router.back()
    }

    return (
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={goBackHandler}>
                <Ionicons name="chevron-back" size={28} color={text} />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
        </View>
    )
}

export default EditProfileHeader

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 38,
        fontWeight: 700,
    },
})