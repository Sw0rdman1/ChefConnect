const categories = [
    { id: '001', name: 'Savory', image: require('../assets/images/main/categories/001.png') },
    { id: '002', name: 'Sweet', image: require('../assets/images/main/categories/002.png') },
    { id: '001001', name: 'Burger', image: require('../assets/images/main/categories/001001.png') },
    { id: '001002', name: 'Pizza', image: require('../assets/images/main/categories/001002.png') },
    { id: '001003', name: 'Fish food', image: require('../assets/images/main/categories/001003.png') },
    { id: '001004', name: 'Salads', image: require('../assets/images/main/categories/001004.png') },
    { id: '001005', name: 'Breakfast', image: require('../assets/images/main/categories/001005.png') },
    { id: '001006', name: 'Sandwiches', image: require('../assets/images/main/categories/001006.png') },
    { id: '001007', name: 'Tacos', image: require('../assets/images/main/categories/001007.png') },
    { id: '002001', name: 'Cakes', image: require('../assets/images/main/categories/002001.png') },
    { id: '002002', name: 'Cookies', image: require('../assets/images/main/categories/002002.png') },
    { id: '002003', name: 'Pies', image: require('../assets/images/main/categories/002003.png') },
]

export function useCategories(selectedCategoryID: string) {
    if (selectedCategoryID) {
        return categories.filter(category => category.id.startsWith(selectedCategoryID) && category.id.length !== selectedCategoryID.length)
    } else {
        return categories.filter(category => category.id.length === 3)
    }
}

export function useSelectedCategory(selectedCategoryID: string) {
    return categories.find(category => category.id === selectedCategoryID)
}