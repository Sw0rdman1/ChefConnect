import MainScreenHeader from '@/components/main/MainScreenHeader'
import { View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'

const MainScreen = () => {

    return (
        <View style={styles.container}>
            <MainScreenHeader />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})