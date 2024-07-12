import { Stack } from 'expo-router';

export default function MyProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="edit-profile" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name="settings" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </Stack>
    );
}
