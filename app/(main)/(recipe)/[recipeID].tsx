import LoadingScreen from '@/components/ui/LoadingScreen';
import { StyleSheet } from 'react-native'
import { ScrollView, Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors';
import { useRecipe } from '@/hooks/useRecipes';
import { getPublicURL } from '@/utils/helpers';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import AnimatedHeader from '@/components/ui/AnimatedHeader';
import RecipeHeader from '@/components/main/recipe/RecipeHeader';
import RecipeTitle from '@/components/main/recipe/RecipeTitle';
import SaveButton from '@/components/main/recipe/SaveButton';
import IngredientsList from '@/components/main/recipe/IngredientsList';

const RecipeScreen = () => {
    const { recipeID } = useLocalSearchParams<{ recipeID: string }>();
    const { tint, background } = useColors();
    const { recipe, loading } = useRecipe(recipeID as string);

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    if (!recipe) {
        router.back();
        return null;
    }


    return (
        <AnimatedHeader
            headerComponent={<RecipeHeader recipe={recipe} />}
            minHeight={300}
            maxHeight={550}
        >
            <View style={[styles.container, { backgroundColor: `${background}95` }]}>
                <RecipeTitle recipe={recipe} />
                <SaveButton />
                <IngredientsList recipe={recipe} />
            </View>
        </AnimatedHeader>
    )
}

export default RecipeScreen

const styles = StyleSheet.create({
    container: {
        height: 1500,
        gap: 10,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})