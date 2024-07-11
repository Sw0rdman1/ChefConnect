import { StyleSheet } from 'react-native'
import { Text, View } from '../ui/Themed'
import Avatar from '../ui/Avatar'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/hooks/useColors'

const MainScreenHeader = () => {
    const { top } = useSafeAreaInsets()
    const { tint } = useColors()

    return (
        <View style={[styles.container, { paddingTop: top + 10 }]}>
            <Text style={[styles.title, { color: tint }]}>
                ChefConnect
            </Text>
            <Avatar size={50} href='my-profile' />
        </View>
    )
}

export default MainScreenHeader

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
})