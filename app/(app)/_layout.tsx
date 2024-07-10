import { Redirect, Stack } from 'expo-router';
import { Text } from '@/components/ui/Themed';
import { useAuth } from '@/context/AuthContext';


export default function TabLayout() {
    const { isLoading, session } = useAuth();


    if (isLoading) {
        return <Text>Loading...</Text>;
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
