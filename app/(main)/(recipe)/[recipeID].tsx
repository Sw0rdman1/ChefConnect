import LoadingScreen from '@/components/ui/LoadingScreen';
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors';
import { useRecipe } from '@/hooks/useRecipes';
import { getPublicURL } from '@/utils/helpers';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

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
        <ScrollView style={{ backgroundColor: background }} contentContainerStyle={[styles.container, { backgroundColor: background }]}>
            <Image
                source={{ uri: getPublicURL('recipes', recipe.bannerImage) }}
                style={{ width: '100%', aspectRatio: 1 }}
            />
            <Text style={styles.text}>{recipe.title}</Text>
        </ScrollView>
    )
}

export default RecipeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})