import { StyleSheet } from 'react-native'
import { Text, View } from '../../ui/Themed'
import Avatar from '../../ui/Avatar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/hooks/useColors'
import { useApp } from '@/context/AppContext'
import { LinearGradient } from 'expo-linear-gradient'

const MainScreenHeader = () => {
    const { top } = useSafeAreaInsets()
    const { tint } = useColors()
    const { user } = useApp()

    return (
        <View style={[styles.container, { paddingTop: top + 10 }]}>
            <Text style={[styles.title, { color: tint }]}>
                ChefConnect
            </Text>
            <Avatar size={45} href='(my-profile)' source={user?.profilePicture} />
        </View>
    )
}

export default MainScreenHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
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
    linear: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})