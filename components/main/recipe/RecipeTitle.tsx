import { Text } from "@/components/ui/Themed";
import Recipe from "@/models/Recipe";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import AuthorInfo from "./AuthorInfo";
interface RecipeTitleProps {
  recipe: Recipe;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ recipe }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <AuthorInfo user={recipe.createdBy} />
      </View>

    </View>
  );
};

export default RecipeTitle;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  nameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    paddingTop: 5,
    paddingLeft: 2,
    fontSize: 18,
    color: "gray",
  },

});
