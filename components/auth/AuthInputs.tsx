import { Dimensions, StyleSheet } from 'react-native'
import { Text, TextInput, TextInputProps, View } from '../ui/Themed'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '@/hooks/useColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const { width } = Dimensions.get('window')

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
        <View style={styles.container}>

            <View style={[styles.inputContainer, { borderColor: color() }]}>
                <Ionicons style={styles.icon} name="person-circle" size={32} color={color()} />
                <TextInput
                    style={[styles.input, { color: color() }]}
                    autoCapitalize="words"
                    placeholder="Display Name"
                    {...props}
                />
                {status === 'success' ?
                    <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} /> :
                    <View style={{ width: 25 }} />
                }
                {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
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
        <View style={styles.container}>
            <View style={[styles.inputContainer, { borderColor: color() }]}>
                <Entypo style={styles.icon} name="mail" size={28} color={color()} />
                <TextInput
                    style={[styles.input, { color: color() }]}
                    autoCapitalize="none"
                    placeholder="Email"
                    keyboardType="email-address"
                    {...props}
                />
                {status === 'success' ?
                    <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} /> :
                    <View style={{ width: 25 }} />
                }
                {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}

            </View>

        </View>

    )
}


const PasswordInput: React.FC<InputProps> = ({ status, error, ...props }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <Entypo style={styles.icon} name="lock" size={28} color='gray' />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    keyboardType={secureTextEntry ? 'default' : 'visible-password'}
                    {...props}
                />
                {secureTextEntry ?
                    <Ionicons style={styles.icon} name="eye-off" size={28} color='gray' onPress={() => setSecureTextEntry(false)} /> :
                    <Ionicons style={styles.icon} name="eye" size={28} color='gray' onPress={() => setSecureTextEntry(true)} />
                }
                {(status === 'error' && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <View style={{ width: 25 }} />
        </View>

    )
}


export { DisplayNameInput, EmailInput, PasswordInput }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputContainer: {
        width: width - 75,
        marginLeft: 15,
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
        paddingLeft: 10,
        marginRight: 10,
        flexGrow: 1,
    },
    icon: {
        height: 28,
        width: 28,
    },
    successIcon: {
        height: 25,
        width: 25,
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