import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import Recipe from "@/models/Recipe";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SaveButton from "./SaveButton";
import { Image } from "expo-image";
interface RecipeTitleProps {
  recipe: Recipe;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ recipe }) => {
  const { backgroundDarker } = useColors();
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.prepTime}>
          <View style={styles.label}>
            <Image
              source={require("../../../assets/images/main/clock.png")}
              style={styles.icon}
            />
            <Text style={styles.labelText}>Preparation Time:</Text>
          </View>
          <Text style={styles.info}>{recipe.prepareTime} Minutes</Text>
        </View>
        <View style={styles.prepTime}>
          <View style={styles.label}>
            <Image
              source={require("../../../assets/images/main/fire.png")}
              style={styles.icon}
            />
            <Text style={styles.labelText}>Calories:</Text>
          </View>
          <Text style={styles.info}>163 kcal</Text>
        </View>
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
  infoContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    gap: 15,
  },
  prepTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 10,
  },

  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
    paddingRight: 2,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
