import { View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MyProfileHeader from '@/components/main/my-profile/MyProfileHeader'
import ProfileActions from '@/components/main/my-profile/ProfileActions'

const MyProfileScreen = () => {
    const { top } = useSafeAreaInsets()
    const { backgroundDarker } = useColors()


    return (
        <View style={[styles.container, { paddingTop: top + 30, backgroundColor: backgroundDarker }]}>
            <MyProfileHeader />
            <ProfileActions />
        </View>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
})