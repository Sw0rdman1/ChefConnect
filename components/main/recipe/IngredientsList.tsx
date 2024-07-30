import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { Ingredient } from "@/models/Ingredient";
import { getPublicURL } from "@/utils/helpers";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const { tint } = useColors();

  if (!ingredients) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <View
            style={[
              styles.ingredientContainer,
              { backgroundColor: `${tint}15` },
            ]}
            key={ingredient.id}
          >
            <Image
              source={{ uri: getPublicURL("ingredients", ingredient.image) }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default IngredientsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
  },
  ingredients: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 10,
  },
  ingredientContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    gap: 10,
  },
  ingredientName: {
    fontSize: 15,
    color: "gray",
    fontWeight: "bold",
  },
});
