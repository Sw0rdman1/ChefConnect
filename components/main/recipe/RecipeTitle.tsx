import { Text } from '@/components/ui/Themed';
import Recipe from '@/models/Recipe';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native'

interface RecipeTitleProps {
    recipe: Recipe;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ recipe }) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text style={styles.title}>
                    {recipe.title}
                </Text>
                <Text style={styles.description}>
                    {recipe.description}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.prepTime}>
                    <Ionicons name="time" size={24} color="gray" />
                    <Text style={styles.info}>
                        {recipe.prepareTime} Minutes
                    </Text>
                </View>
                <Text style={styles.info}>
                    234 kcal
                </Text>
            </View>

        </View>
    )
}

export default RecipeTitle

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    nameContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    description: {
        paddingTop: 5,
        paddingLeft: 2,
        fontSize: 18,
        color: 'gray',
    },
    infoContainer: {
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    prepTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    info: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold'
    }

})