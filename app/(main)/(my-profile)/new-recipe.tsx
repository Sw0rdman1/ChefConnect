import NewRecipeForm from '@/components/main/new-recipe/NewRecipeForm'
import RecipeImageUpload from '@/components/main/new-recipe/RecipeImageUpload'
import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const NewRecipeScreen = () => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: top + 10 }]}>
            <Text style={styles.title}>
                Create New Recipe
            </Text>
            <NewRecipeForm />
        </View>
    )
}

export default NewRecipeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})