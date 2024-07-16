import { Text, View } from "@/components/ui/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import RecipeEntity from "@/models/Recipe";
import { Image } from "expo-image";
import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";

const BORDER_RADIUS = 15;

interface RecipeCardProps {
  recipe: RecipeEntity;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { background, text } = useColors();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: background, shadowColor: text }]}
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
    marginHorizontal: 15,
    marginVertical: 15,
    height: 160,
    borderRadius: BORDER_RADIUS,
    gap: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,

  },
  textContainer: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    gap: 5,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
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
    marginTop: 5,
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
