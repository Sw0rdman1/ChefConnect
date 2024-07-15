import MainScreenHeader from '@/components/main/home/MainScreenHeader'
import { View } from '@/components/ui/Themed'
import { Dimensions, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '@/hooks/useColors';
import FilterBottomSheet from '@/components/main/home/FilterBottomSheet';

const { height } = Dimensions.get('window')

const MainScreen = () => {
    const { background, tintBackground } = useColors()

    return (
        <View style={styles.container}>
            <LinearGradient colors={[tintBackground, background, background]} style={styles.linearGradient} />
            <MainScreenHeader />
            <FilterBottomSheet />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 2
    },
})