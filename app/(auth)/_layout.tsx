import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';


export default function AuthLayout() {

    const { isLoading, } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="log-in" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="registration" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="success" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
            <Stack.Screen name="confirm-email" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
        </Stack>
    );
}


