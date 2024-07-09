import { StyleSheet } from 'react-native'
import { Text, TextInput, TextInputProps, View } from '../ui/Themed'

interface InputProps extends TextInputProps {
    error?: string
}

const EmailInput: React.FC<InputProps> = ({ error, ...props }) => {
    return (
        <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}




export { EmailInput }

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
    },
})