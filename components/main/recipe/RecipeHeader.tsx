import { View } from '@/components/ui/Themed'
import Recipe from '@/models/Recipe';
import { getPublicURL } from '@/utils/helpers';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

interface RecipeHeaderProps {
    recipe: Recipe;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
    return (
        <View style={styles.container}>
            <View style={styles.opacity} />
            <Image
                source={{ uri: getPublicURL("recipes", `${recipe.bannerImage}`) }}
                style={styles.image}
            />
            <View style={styles.bottomView} />
        </View>
    )
}

export default RecipeHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 70,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        zIndex: 2,
    },
    opacity: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 1,
    },
})