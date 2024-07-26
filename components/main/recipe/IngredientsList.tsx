import { Text } from '@/components/ui/Themed';
import Recipe from '@/models/Recipe';
import { StyleSheet, View } from 'react-native'

interface IngredientsListProps {
    recipe: Recipe;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ recipe }) => {
    console.log(recipe.ingredients);
    const ingredients = [{}]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients</Text>
        </View>
    )
}

export default IngredientsList

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold'
    },
})