import BackButton from '@/components/ui/BackButton';
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
            <BackButton />
            <Image
                source={{ uri: getPublicURL("recipes", `${recipe.bannerImage}`) }}
                style={styles.image}
            />
            <View style={styles.borderRadius} />
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
        zIndex: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    opacity: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1,
    },
    borderRadius: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 30,
        zIndex: 2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
})