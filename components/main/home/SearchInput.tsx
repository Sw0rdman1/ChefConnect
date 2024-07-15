import { View } from '@/components/ui/Themed'
import { StyleSheet } from 'react-native'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const { text, backgroundDarker, placeholderText } = useColors()

    return (
        <View style={[styles.inputContainer, { backgroundColor: backgroundDarker }]}>
            <Ionicons name="search" size={24} color={text} />
            <BottomSheetTextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search for recipes"
                placeholderTextColor={placeholderText}

                style={[styles.textInput, { color: text }]}
            />
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: 16,
        fontWeight: '500',
    }
})