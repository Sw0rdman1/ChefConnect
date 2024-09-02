import { StyleSheet } from 'react-native'
import { View } from '@/components/ui/Themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/hooks/useColors'
import Header from '@/components/main/my-profile/Header'
import MyRecipesList from '@/components/main/my-profile/MyRecipeList'

const MyRecipesScreen = () => {
    const { top } = useSafeAreaInsets()
    const { backgroundDarker } = useColors()

    return (
        <View style={[styles.container, { backgroundColor: backgroundDarker }]}>
            <Header title="My Recipes" />
            <MyRecipesList />
        </View>
    )
}

export default MyRecipesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})