import { StyleSheet } from 'react-native'
import { Text, TextInput, TextInputProps, View } from '../ui/Themed'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '@/hooks/useColors';

interface InputProps extends TextInputProps {
    status: 'empty' | 'error' | 'success',
    error?: string
}

const EmailInput: React.FC<InputProps> = ({ status, error, ...props }) => {
    const { tint } = useColors()

    const color = () => {
        switch (status) {
            case 'empty':
                return 'gray'
            case 'error':
                return 'red'
            case 'success':
                return tint
        }
    }

    return (
        <View style={[styles.inputContainer, { borderColor: color() }]}>
            <Entypo style={styles.icon} name="mail" size={28} color={color()} />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Enter your email"
                keyboardType="email-address"
                {...props}
            />
            {status === 'success' && <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} />}
            {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}


export { EmailInput }

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        padding: 5,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
        paddingRight: 60
    },
    icon: {
        marginRight: 5,
        height: 28,
        width: 28,
    },
    successIcon: {
        position: 'absolute',
        right: 5,
        height: 24,
        width: 24,
    },
    errorText: {
        position: 'absolute',
        left: 5,
        bottom: -30,
        height: 20,
        color: 'red',
        fontSize: 13,
        fontWeight: '500',
    },
})