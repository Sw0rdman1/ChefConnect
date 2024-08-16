import { FlatList, StyleSheet, } from 'react-native'
import React from 'react'
import Recipe from '@/models/Recipe'
import UserProfileRecipeCard from './UserProfileRecipeCard'
import { useColors } from '@/hooks/useColors'
import { Text, View } from '@/components/ui/Themed'

interface UserRecipesProps {
    recipes: Recipe[]
}

const UserRecipes: React.FC<UserRecipesProps> = ({ recipes }) => {
    const { tint, text } = useColors()

    return (
        <>
            <View style={[styles.recipeTitleContainer, { shadowColor: text }]}>
                <Text style={[styles.recipeTitle, { color: tint }]}>{recipes.length}</Text>
                <Text style={styles.recipeTitle}>Recipes</Text>
            </View>
            <FlatList
                style={{ width: '100%' }}
                data={recipes}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(recipe) => recipe.id}
                renderItem={({ item: recipe }) => (
                    <UserProfileRecipeCard recipe={recipe} />
                )}
            />
        </>
    )
}

export default UserRecipes

const styles = StyleSheet.create({
    recipeTitleContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignSelf: 'flex-start',
        paddingRight: 30,
        marginBottom: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})