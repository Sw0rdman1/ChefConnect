import EditProfileHeader from '@/components/main/my-profile/EditProfileHeader'
import { View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const EditProfileScreen = () => {
  const { top } = useSafeAreaInsets()
  const { backgroundDarker } = useColors()

  return (
    <View style={[styles.container, { paddingTop: top + 30, backgroundColor: backgroundDarker }]}>
      <EditProfileHeader />
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
})