import { useColors } from '@/hooks/useColors';
import { Link } from 'expo-router';
import { forwardRef } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'

interface ButtonProps {
    onPress?: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = forwardRef(({ text, onPress }, ref) => {
    const { tint } = useColors()

    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, { backgroundColor: tint }]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
})

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 54,
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
})