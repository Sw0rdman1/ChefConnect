import { Stack } from 'expo-router';


export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="log-in" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="registration" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
        </Stack>
    );
}


