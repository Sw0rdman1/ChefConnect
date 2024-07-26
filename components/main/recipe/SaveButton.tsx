import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SaveButton = () => {
    const [isSaved, setIsSaved] = useState(false);
    const { tint, background } = useColors();

    const handleSave = () => {
        setIsSaved(!isSaved);
    }

    return (
        <TouchableOpacity
            style={[styles.container,
            { borderColor: tint, backgroundColor: isSaved ? `${tint}20` : tint }
            ]}
            onPress={handleSave}
        >
            <Text style={[styles.text, { color: isSaved ? tint : background }]}>
                {isSaved ? "Recipe saved" : "Save recipe"}
            </Text>
            <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={22}
                color={isSaved ? tint : background}
            />
        </TouchableOpacity>
    )
}

export default SaveButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        gap: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
})