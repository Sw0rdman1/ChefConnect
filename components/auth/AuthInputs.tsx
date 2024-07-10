import { StyleSheet } from 'react-native'
import { Text, TextInput, TextInputProps, View } from '../ui/Themed'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '@/hooks/useColors';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InputProps extends TextInputProps {
    status: 'empty' | 'error' | 'success',
    error?: string
}

const DisplayNameInput: React.FC<InputProps> = ({ status, error, ...props }) => {
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
            <Ionicons style={styles.icon} name="person-circle" size={32} color={color()} />
            <TextInput
                style={[styles.input, { color: color() }]}
                autoCapitalize="words"
                placeholder="Display Name"
                {...props}
            />
            {status === 'success' && <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} />}
            {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
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
                style={[styles.input, { color: color() }]}
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                {...props}
            />
            {status === 'success' && <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} />}
            {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}


const PasswordInput: React.FC<InputProps> = ({ status, error, ...props }) => {

    return (
        <View style={styles.inputContainer}>
            <Entypo style={styles.icon} name="lock" size={28} color='gray' />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry
                {...props}
            />
            {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}


export { DisplayNameInput, EmailInput, PasswordInput }

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        paddingBottom: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
        flexGrow: 1,
        paddingRight: 60,
        paddingLeft: 10,
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
        bottom: -25,
        height: 20,
        color: 'red',
        fontSize: 13,
        fontWeight: '500',
    },
})