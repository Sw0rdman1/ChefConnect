import { Text, View } from '@/components/ui/Themed'
import { useColors } from '@/hooks/useColors'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CategoryProps {
    title: string,
    selected: boolean,
    onPress: () => void
}

const Category: React.FC<CategoryProps> = ({ title, selected, onPress }) => {
    const { backgroundDarker, text } = useColors()
    return (
        <TouchableOpacity style={[styles.category, { backgroundColor: selected ? text : backgroundDarker }]} onPress={onPress}>
            <Text style={[styles.categoryText, { color: selected ? backgroundDarker : text }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const TrendingRecipeList = () => {
    const [selectedCategory, setSelectedCategory] = useState<'trending' | 'bestRated' | 'new'>('trending')
    return (
        <View style={styles.container}>
            <View style={styles.categorySelectContainer}>
                <Category title="Trending 🔥" selected={selectedCategory === 'trending'} onPress={() => setSelectedCategory('trending')} />
                <Category title="New 🆕" selected={selectedCategory === 'new'} onPress={() => setSelectedCategory('new')} />
                <Category title="Best Rated ✅" selected={selectedCategory === 'bestRated'} onPress={() => setSelectedCategory('bestRated')} />
            </View>
        </View>
    )
}

export default TrendingRecipeList

const styles = StyleSheet.create({
    container: {
        paddingTop: 170,
    },
    categorySelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 10
    },
    category: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold'
    }

})