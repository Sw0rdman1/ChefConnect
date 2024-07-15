import { Text, View } from '@/components/ui/Themed'
import { useCategories } from '@/hooks/useCategories'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

interface CategoryEntity {
    id: string
    name: string
    image: string
}


const Category = ({ category }: { category: CategoryEntity }) => {
    const { text, background } = useColors()

    return (
        <TouchableOpacity style={[styles.category, { backgroundColor: background, shadowColor: text }]}>
            <Image
                source={category.image}
                style={{ width: 120, height: 120 }}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    )
}

const InitialCategories = ({ categories }: { categories: CategoryEntity[] }) => {
    return (
        <View style={styles.initialContainer}>
            {categories.map(category => <Category key={category.id} category={category} />)}
        </View>
    )
}

const CategorySelect = () => {
    const categories = useCategories()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Or find it by category</Text>
            {categories.length === 2 ?
                <InitialCategories categories={categories} /> :
                <FlatList
                    style={styles.list}
                    data={categories}
                    renderItem={({ item }) => <Category category={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default CategorySelect

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 20,
    },
    initialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    list: {
        width: '100%',
        height: 250,
    },
    category: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: '600',
    },
})