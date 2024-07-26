import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '@/hooks/useColors';
import { useRouter } from 'expo-router';

const BackButton = () => {
    const { background } = useColors();
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <TouchableOpacity
            onPress={handleBack}
            style={[styles.container, { backgroundColor: `${background}80` }]}
        >
            <Ionicons name="chevron-back" size={24} color={background} />
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 101,
        justifyContent: 'center',
        alignItems: 'center',
    }
})