import { StyleSheet, TouchableOpacity } from 'react-native'
import { useColors } from '@/hooks/useColors'
import { Text, View } from '@/components/ui/Themed'
import { Ionicons } from '@expo/vector-icons';

interface RecipeListHeaderProps {
    openFiltersHandler: () => void
}

const RecipeListHeader: React.FC<RecipeListHeaderProps> = ({ openFiltersHandler }) => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipes</Text>
            <TouchableOpacity style={styles.filterContainer} onPress={openFiltersHandler}>
                <Ionicons name="filter" size={24} color={tint} />
                <Text style={[styles.filterText, { color: tint }]}>Filters</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RecipeListHeader

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    filterContainer: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    filterText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})