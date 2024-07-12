import EditProfileForm from '@/components/main/my-profile/EditProfileForm'
import EditProfileHeader from '@/components/main/my-profile/EditProfileHeader'
import { View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const EditProfileScreen = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top + 30 }]}>
      <EditProfileHeader />
      <EditProfileForm />
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
})