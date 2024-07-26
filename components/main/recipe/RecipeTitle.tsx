import { Text } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import Recipe from '@/models/Recipe';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
interface RecipeTitleProps {
    recipe: Recipe;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ recipe }) => {
    const { backgroundDarker } = useColors();
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
                <View style={[styles.prepTime, { backgroundColor: backgroundDarker }]}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>
                            Prep Time
                        </Text>
                        <Ionicons name="time" size={16} color="gray" />
                    </View>
                    <Text style={styles.info}>
                        {recipe.prepareTime} Minutes
                    </Text>
                </View>
                <View style={[styles.prepTime, { backgroundColor: backgroundDarker }]}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>
                            Calories
                        </Text>
                        <MaterialCommunityIcons name="fire" size={22} color="gray" />
                    </View>
                    <Text style={styles.info}>
                        163 kcal
                    </Text>
                </View>
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
        paddingBottom: 10,
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
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    prepTime: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: 150,
        height: 70,
        borderRadius: 10,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',
        paddingRight: 2,
    },
    info: {
        fontSize: 16,
        fontWeight: 'bold'
    }

})