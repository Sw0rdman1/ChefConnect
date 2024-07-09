import { useColors } from '@/hooks/useColors';
import { Link } from 'expo-router';
import { StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'

interface ButtonProps {
    onPress?: () => void;
    href?: string;
    text: string;
}

const Button = ({ onPress, text, href }: ButtonProps) => {
    const { tint } = useColors()

    if (href) {
        return (
            <Link href={href} asChild>
                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: tint }]}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            </Link>
        )
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, { backgroundColor: tint }]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})