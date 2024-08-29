import { Text, View } from "@/components/ui/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import RecipeEntity from "@/models/Recipe";
import { Image } from "expo-image";
import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { handleSaveClick } from "@/services/SaveService";
import { useApp } from "@/context/AppContext";

const BORDER_RADIUS = 15;

interface RecipeCardProps {
  recipe: RecipeEntity;
  horizontal?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, horizontal }) => {
  const { background, text, tint, tintLowOpacity } = useColors();
  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const { user } = useApp();

  const openRecipeScreenHandler = () => {
    router.push(`/(recipe)/${recipe.id}`);
  };

  const handleSavePress = async () => {
    const wasSaved = isSaved;
    setIsSaved((prev) => !prev);
    await handleSaveClick(recipe.id, wasSaved, user?.id as string);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={openRecipeScreenHandler}
      style={[
        styles.container,
        {
          paddingRight: horizontal ? 15 : 0,
          height: horizontal ? 100 : 150,
          backgroundColor: background,
          shadowColor: text,
        },
      ]}
    >
      <Image
        contentFit="fill"
        source={{
          uri: recipe.bannerImage
        }}
        style={[styles.image, { width: horizontal ? 100 : 150 }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.prepareTimeContainer}>
          <Ionicons name="time-sharp" size={16} color="gray" />
          <Text style={styles.prepareTime}>{recipe.prepareTime} minutes</Text>
        </View>
        {!horizontal && (
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: isSaved ? tintLowOpacity : background,
                shadowColor: isSaved ? tintLowOpacity : text,
              },
            ]}
            onPress={handleSavePress}
          >
            <Text style={[styles.saveText, { color: tint }]}>
              {isSaved ? "Saved" : "Save"}
            </Text>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={18}
              color={tint}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: BORDER_RADIUS,
    gap: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    gap: 7,
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
  saveButton: {
    marginTop: 15,
    marginRight: 10,
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginRight: 5,
  },
});
