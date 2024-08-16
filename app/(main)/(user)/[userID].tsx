import LoadingScreen from '@/components/ui/LoadingScreen';
import { Text, View } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getPublicURL } from '@/utils/helpers';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const UserProfileScreen = () => {
    const { userID } = useLocalSearchParams<{ userID: string }>();
    const { user, loading } = useUserProfile(userID as string);
    const { tint } = useColors();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user) {
        router.back();
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer]}>
                <View style={styles.imageChildContainer}>
                    <View style={[styles.image, { backgroundColor: tint }]} />
                </View>
            </View>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    profilePicture: {
        width: "100%",
        aspectRatio: 1,
        borderBottomRightRadius: 50,
    },
    imageContainer: {
        height: 250,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 250,
        borderBottomEndRadius: 250,
        overflow: 'hidden',
    },
    imageChildContainer: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
})