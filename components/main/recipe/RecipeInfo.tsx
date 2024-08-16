import { Text } from '@/components/ui/Themed'
import Recipe from '@/models/Recipe'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

interface RecipeInfoProps {
    recipe: Recipe
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => {
    return (
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
    )
}

export default RecipeInfo

const styles = StyleSheet.create({
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
})