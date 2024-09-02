import { View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { top } = useSafeAreaInsets()
    const { tint } = useColors()

    const goBackHandler = () => {
        router.back();
    };

    return (
        <View
            style={[styles.container, { paddingTop: top + 20 }]}
        >
            <View style={styles.left}>
                <TouchableOpacity onPress={goBackHandler}>
                    <Ionicons name="chevron-back" size={28} color={tint} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
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
    right: {},
    title: {
        fontSize: 32,
        fontWeight: "bold",
    },
})