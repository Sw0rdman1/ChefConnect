import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors';
import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/models/Ingredient';
import { getPublicURL } from '@/utils/helpers';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

interface IngredientCardProps {
    ingredient: Ingredient
    isSelected: boolean;
    setFieldValue: any;
    ingredients: string[];
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, isSelected, setFieldValue, ingredients }) => {
    const { tint, background, text } = useColors();

    const handlePress = () => {
        if (isSelected) {
            const newIngredients = ingredients.filter(id => id !== ingredient.id);
            setFieldValue('ingredients', newIngredients);
        } else {
            setFieldValue('ingredients', [ingredient.id, ...ingredients]);
        }
    }

    return (
        <TouchableOpacity
            style={[styles.card,
            {
                backgroundColor: isSelected ? `${tint}55` : background,
                shadowColor: isSelected ? tint : text,
            }]}
            onPress={handlePress}
        >
            <Image
                source={{ uri: getPublicURL("ingredients", ingredient.image) }}
                style={{ width: 40, height: 40 }}
            />
            <Text style={[styles.ingredientName, { color: isSelected ? 'white' : text }]}>{ingredient.name}</Text>
        </TouchableOpacity >
    )
}


interface SelectIngredientsProps {
    values: {
        ingredients: string[]
    };
    setFieldValue: any;
}

const SelectIngredients: React.FC<SelectIngredientsProps> = ({ values, setFieldValue }) => {
    const { ingredients, setIngredients } = useIngredients();

    useEffect(() => {
        const selectedIngredients = ingredients.filter(ingredient => values.ingredients.includes(ingredient.id));
        const notSelectedIngredients = ingredients.filter(ingredient => !values.ingredients.includes(ingredient.id));
        setIngredients([...selectedIngredients, ...notSelectedIngredients]);
    }, [values.ingredients])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select ingredients</Text>
            <FlatList
                contentContainerStyle={styles.list}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ingredients}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <IngredientCard ingredient={item} isSelected={values.ingredients.includes(item.id)} setFieldValue={setFieldValue} ingredients={values.ingredients} />
                )}
            />
        </View>
    )
}

export default SelectIngredients

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    list: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 5,
    },
    card: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        gap: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,

    },
    ingredientName: {
        fontSize: 15,
        color: "gray",
        fontWeight: "bold",
    },
})