import ProfileActionHeaders from '@/components/main/my-profile/ProfileActionHeader'
import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ChangePasswordScreen = () => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: top + 30 }]}>
            <ProfileActionHeaders title="Change Password" />
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
})