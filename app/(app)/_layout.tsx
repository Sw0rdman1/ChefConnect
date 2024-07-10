import { Redirect, Stack } from 'expo-router';
import { Text } from '@/components/ui/Themed';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/ui/LoadingScreen';


export default function TabLayout() {
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
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    );
}
