import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";
import RecipeCard from "../home/RecipeCard";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";


const SavedRecipesList: React.FC = () => {
    const { recipes, loading } = useSavedRecipes();
    const { tint } = useColors();


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={{ marginTop: 250 }}
                    size="large"
                    color={tint}
                />
            </View>
        );
    }

    if (recipes.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Unfortunatly, we couldn't find any recipes for you. 🥺
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            style={{ flex: 1, backgroundColor: "transparent" }}
            data={recipes}
            renderItem={({ item: recipe }) => <RecipeCard recipe={recipe} />}
            keyExtractor={(recipe) => recipe.id}
            ListFooterComponent={
                <View style={{ height: 100, backgroundColor: "transparent" }} />
            }
        />
    );
};

export default SavedRecipesList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        alignItems: "center",
        paddingHorizontal: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 250,
    },
});
