import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'

const ProfileActionHeaders = ({ title }: { title: string }) => {
    const { text } = useColors()

    const goBackHandler = () => {
        router.back()
    }

    return (
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={goBackHandler}>
                <Ionicons name="chevron-back" size={28} color={text} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default ProfileActionHeaders

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