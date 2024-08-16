import UserInformations from '@/components/main/user-profile/UserInformations';
import UserRecipes from '@/components/main/user-profile/UserRecipes';
import BackButton from '@/components/ui/BackButton';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { View } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const IMAGE_SIZE = 450;
const USER_CARD_HEIGHT = 100;

const UserProfileScreen = () => {
    const { userID } = useLocalSearchParams<{ userID: string }>();
    const { user, recipes, loading } = useUserProfile(userID as string, true);
    const { backgroundDarker, tint } = useColors();

    const openChatHandler = () => {
        // router.push(`/(inbox)/${userID}`);
    }

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user) {
        router.back();
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: backgroundDarker }]}>
            <BackButton />
            <Image source={{ uri: user.profilePicture }} style={styles.image} />
            <UserInformations user={user} userCardHeight={USER_CARD_HEIGHT} imageHeight={IMAGE_SIZE} />
            <UserRecipes recipes={recipes} />
        </View >
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: IMAGE_SIZE,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },



})