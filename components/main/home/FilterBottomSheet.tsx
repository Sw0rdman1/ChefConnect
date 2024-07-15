import { Dimensions, StyleSheet } from 'react-native'
import { Text } from '@/components/ui/Themed';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import Handle from '../../ui/BottomSheetHandle';
import SearchInput from './SearchInput';
import { useColors } from '@/hooks/useColors';
import CategorySelect from './CategorySelect';

const { width } = Dimensions.get('window')

const FilterBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { background } = useColors()

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheet
            backgroundStyle={{ backgroundColor: background }}
            snapPoints={[60, 480]}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            backdropComponent={(backdropProps) => (
                <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
            )}
            handleComponent={(values) =>
                <Handle
                    animatedPosition={values.animatedPosition}
                    animatedIndex={values.animatedIndex}
                />
            }
        >
            <BottomSheetView style={[styles.container, { backgroundColor: background }]}>
                <Text style={styles.title}>Find that one recipe you love</Text>
                <SearchInput />
                <CategorySelect />
            </BottomSheetView>
        </BottomSheet>
    )
}

export default FilterBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: '800',
        marginVertical: 20,
    },

})