import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/hooks/useColors'
import { Text, View } from '@/components/ui/Themed'

const MainScreenHeader = () => {
    const { top } = useSafeAreaInsets()
    const { tint } = useColors()
    return (
        <View style={[styles.container, { paddingTop: top + 5 }]}>
            <Text style={[styles.title, { color: tint }]}>ChefConnect</Text>
        </View>
    )
}

export default MainScreenHeader

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})