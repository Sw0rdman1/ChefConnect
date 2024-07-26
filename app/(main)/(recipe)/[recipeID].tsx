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

const RecipeScreen = () => {
    const { recipeID } = useLocalSearchParams<{ recipeID: string }>();
    const { tint, background } = useColors();
    const { recipe, loading } = useRecipe(recipeID as string);

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    if (!recipe || !recipeID) {
        router.back();
        return null;
    }



    return (
        <AnimatedHeader
            headerComponent={<RecipeHeader recipe={recipe} />}
            minHeight={200}
            maxHeight={550}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{recipe.title}</Text>
            </View>
        </AnimatedHeader>
    )
}

export default RecipeScreen

const styles = StyleSheet.create({
    container: {
        height: 1500,
        gap: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})