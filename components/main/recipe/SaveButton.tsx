import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import Recipe from "@/models/Recipe";
import { handleSaveClick } from "@/services/SaveService";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SaveButtonProps {
  recipe: Recipe;
}

const SaveButton: React.FC<SaveButtonProps> = ({ recipe }) => {
  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const { tint, background } = useColors();
  const { user } = useApp();

  const handleSave = async () => {
    const wasSaved = isSaved;
    setIsSaved((prev) => !prev);
    await handleSaveClick(recipe.id, wasSaved, user?.id as string);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: tint, backgroundColor: isSaved ? `${tint}20` : tint },
      ]}
      onPress={handleSave}
    >
      <Text style={[styles.text, { color: isSaved ? tint : background }]}>
        {isSaved ? "Recipe saved" : "Save recipe"}
      </Text>
      <Ionicons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={22}
        color={isSaved ? tint : background}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    gap: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
