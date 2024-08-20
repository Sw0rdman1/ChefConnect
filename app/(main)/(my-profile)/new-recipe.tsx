import { Text, View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

const NewRecipeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                New Recipe
            </Text>
        </View>
    )
}

export default NewRecipeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})