import { StyleSheet } from 'react-native'
import { Text, TextInput, View } from '../ui/Themed'

interface InputProps {
    value: string
    setValue: (text: string) => void
}

const EmailInput: React.FC<InputProps> = ({ value, setValue }) => {
    return (
        <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
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
})