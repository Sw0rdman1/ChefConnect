import { Dimensions, StyleSheet, Text, View } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import Handle from '../../ui/BottomSheetHandle';

const { height } = Dimensions.get('window')

const FilterBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheet
            snapPoints={[60, '60%']}
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
            <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default FilterBottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})