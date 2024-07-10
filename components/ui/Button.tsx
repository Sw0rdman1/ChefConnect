import { useColors } from '@/hooks/useColors';
import { forwardRef } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'

interface ButtonProps {
    onPress?: () => void;
    text: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef(({ text, onPress, disabled }, ref) => {
    const { tint, tintLowOpacity } = useColors()

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.buttonContainer, { backgroundColor: disabled ? tintLowOpacity : tint }]}
        >
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