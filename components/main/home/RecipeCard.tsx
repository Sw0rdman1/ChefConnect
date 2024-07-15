import { Text, View } from "@/components/ui/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import RecipeEntity from "@/models/Recipe";
import { Image } from "expo-image";
import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";

interface RecipeCardProps {
  recipe: RecipeEntity;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { background } = useColors();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: background }]}
    >
      <Image
        contentFit="fill"
        source={{ uri: recipe.image }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.prepareTimeContainer}>
          <Ionicons name="time-sharp" size={16} color="gray" />
          <Text style={styles.prepareTime}>{recipe.prepareTime} minutes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 150,
    borderRadius: 10,
    gap: 10,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 5,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "gray",
  },
  prepareTimeContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  prepareTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
  },
});
