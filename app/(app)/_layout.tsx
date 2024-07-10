import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/ui/LoadingScreen';


export default function MainScreenLayout() {
    const { isLoading, session } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!session || !session.user) {
        return <Redirect href="(auth)" />;
    }

    if (session.user && session.user.email_confirmed_at === null) {
        return <Redirect href="(auth)/confirm-email" />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: false }} />
        </Stack>
    );
}
