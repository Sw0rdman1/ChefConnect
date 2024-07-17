import { Text, View } from "@/components/ui/Themed";
import { useCategories, useSelectedCategory } from "@/hooks/useCategories";
import { useColors } from "@/hooks/useColors";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectedCategory from "./SelectedCategory";
import { useRecipesContext } from "@/context/RecipesContext";
import { getPublicURL } from "@/utils/helpers";

interface CategoryEntity {
  id: string;
  name: string;
  image: string;
}

interface CategoryProps {
  category: CategoryEntity;
  handleCategorySelect: (category: CategoryEntity) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  handleCategorySelect,
}) => {
  const { text, background } = useColors();

  return (
    <TouchableOpacity
      onPress={() => handleCategorySelect(category)}
      style={[
        styles.category,
        { backgroundColor: background, shadowColor: text },
      ]}
    >
      <Image
        source={getPublicURL("categories", `${category.id}.png`)}
        style={{ width: 120, height: 120 }}
      />
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const CategorySelect = () => {
  const { selectedCategoryID, setSelectedCategoryID } = useRecipesContext();
  const { categories } = useCategories(selectedCategoryID);
  const selectedCategory = useSelectedCategory(selectedCategoryID);

  const handleCategorySelect = (category: CategoryEntity) => {
    setSelectedCategoryID(category.id);
  };

  const goBackHandler = () => {
    if (selectedCategoryID.length === 3) {
      setSelectedCategoryID("");
      return;
    }
    const previousCategory = selectedCategoryID.slice(0, 3);

    if (!previousCategory) {
      setSelectedCategoryID("");
    } else {
      setSelectedCategoryID(previousCategory);
    }
  };

  return (
    <View style={styles.container}>
      <SelectedCategory
        selectedCategory={selectedCategory}
        categories={categories}
        goBackHandler={goBackHandler}
      />
      <FlatList
        contentContainerStyle={styles.list}
        data={categories}
        renderItem={({ item }) => (
          <Category
            category={item}
            handleCategorySelect={handleCategorySelect}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
  },

  list: {
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 10,
    gap: 15,
    justifyContent: "space-around",
  },
  category: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
