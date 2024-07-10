import * as AppleAuthentication from 'expo-apple-authentication';
import { StyleSheet } from 'react-native';
import { Text, View } from '../ui/Themed';
import { isDarkMode } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

export default function AppleSignButton({ isLogin }: { isLogin: boolean }) {
    const isDark = isDarkMode();
    const { signInWithApple } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.text}> or </Text>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                    isLogin
                        ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                        : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
                }
                buttonStyle={
                    isDark
                        ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                        : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={15}
                style={styles.button}
                onPress={signInWithApple}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        gap: 15,
    },
    button: {
        width: '100%',
        height: 54,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
