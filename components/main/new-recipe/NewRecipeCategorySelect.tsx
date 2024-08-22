import { Text, View } from "@/components/ui/Themed";
import { useCategories, useSelectedCategory } from "@/hooks/useCategories";
import { useColors } from "@/hooks/useColors";
import { Image } from "expo-image";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getPublicURL } from "@/utils/helpers";
import SelectedCategory from "./NewRecipeSelectedCategory";

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
                style={{ width: 50, height: 50 }}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    );
};

interface NewRecipeCategorySelectProps {
    values: {
        category: string;
    };
    handleChange: any;
}

const NewRecipeCategorySelect: React.FC<NewRecipeCategorySelectProps> = ({ values, handleChange }) => {
    const { categories } = useCategories(values.category);
    const { selectedCategory } = useSelectedCategory(values.category);

    const handleCategorySelect = (category: CategoryEntity) => {
        handleChange("category")(category.id);
    };

    const goBackHandler = () => {
        if (values.category.length === 3) {
            handleChange("category")("");
            return;
        }
        const previousCategory = values.category.slice(0, 3);

        if (!previousCategory) {
            handleChange("category")("")
        } else {
            handleChange("category")(previousCategory);
        }
    };

    if (categories.length === 0 && !selectedCategory) {
        return null;
    }

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

export default NewRecipeCategorySelect;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
    },
    list: {
        minWidth: "100%",
        paddingHorizontal: 15,
        gap: 15,
        paddingVertical: 5,
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
        fontSize: 14,
        fontWeight: "600",
    },
});
