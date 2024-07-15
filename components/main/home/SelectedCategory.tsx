import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Category } from "@/models/Category";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { Text, View } from "@/components/ui/Themed";

interface SelectedCategoryProps {
  selectedCategory: Category | undefined;
  categories: Category[];
  goBackHandler: () => void;
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({
  selectedCategory,
  categories,
  goBackHandler,
}) => {
  const { text, background, backgroundDarker, tint, tintLowOpacity } =
    useColors();

  return (
    <View
      style={
        categories.length !== 0
          ? styles.selectedCategoryContainer
          : styles.lastCategoryContainer
      }
    >
      {selectedCategory ? (
        <>
          <Text style={styles.selectedCategoryTitle}>Selected category</Text>
          {categories.length !== 0 ? (
            <View
              style={[
                styles.selectedCategory,
                { backgroundColor: background, shadowColor: text },
              ]}
            >
              <Image
                source={selectedCategory.image}
                style={{ width: 35, height: 35 }}
              />
              <Text style={styles.selectedCategoryText}>
                {selectedCategory.name}
              </Text>
              <TouchableOpacity
                onPress={goBackHandler}
                style={[styles.remove, { backgroundColor: backgroundDarker }]}
              >
                <Ionicons name="close" size={20} color={tint} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                styles.lastCategory,
                { backgroundColor: background, shadowColor: text },
              ]}
            >
              <View style={styles.categoryInfo}>
                <Image
                  source={selectedCategory.image}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={[styles.lastCategoryText, { color: text }]}>
                  {selectedCategory.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={goBackHandler}
                style={[styles.removeLast, { backgroundColor: tint }]}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.title}>Or find it by category</Text>
      )}
    </View>
  );
};

export default SelectedCategory;

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  selectedCategoryContainer: {
    paddingHorizontal: 5,
    height: 40,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedCategoryText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },
  selectedCategoryTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  remove: {
    marginLeft: 10,
    padding: 2,
    borderRadius: 20,
  },
  lastCategoryContainer: {
    paddingHorizontal: 5,
    height: 40,
    gap: 25,
  },
  lastCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingRight: 15,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lastCategoryText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 5,
  },
  removeLast: {
    marginLeft: 10,
    padding: 2,
    borderRadius: 20,
  },
});
