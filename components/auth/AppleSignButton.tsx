import * as AppleAuthentication from 'expo-apple-authentication';
import { StyleSheet } from 'react-native';
import { Text, View } from '../ui/Themed';
import { isDarkMode } from '@/hooks/useColors';

export default function AppleSignButton({ isLogin }: { isLogin: boolean }) {
    const isDark = isDarkMode();

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
                onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        });
                        // signed in
                    } catch (e) {

                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        gap: 20,
    },
    button: {
        width: '100%',
        height: 54,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
