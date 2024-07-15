const categories = [
    { id: '001', name: 'Sweet', image: require('../assets/images/main/categories/001.png') },
    { id: '002', name: 'Savory', image: require('../assets/images/main/categories/002.png') },
]

export function useCategories() {
    return categories
}