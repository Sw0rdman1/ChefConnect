import Button from '@/components/ui/Button';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Text, View } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const IMAGE_SIZE = 450;
const USER_CARD_HEIGHT = 100;

const UserProfileScreen = () => {
    const { userID } = useLocalSearchParams<{ userID: string }>();
    const { user, loading } = useUserProfile(userID as string);
    const { backgroundDarker, tint } = useColors();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user) {
        router.back();
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: backgroundDarker }]}>
            <Image
                source={{ uri: user.profilePicture }}
                style={styles.image}
            />
            <View style={styles.userCard}>
                <Text style={styles.name}>
                    {user.displayName}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Image
                        source={require("../../../assets/images/main/biography.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.bio}>
                        "{user.bio}"
                    </Text>
                </View>

            </View>

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
    userCard: {
        height: USER_CARD_HEIGHT,
        marginTop: IMAGE_SIZE - USER_CARD_HEIGHT / 2,
        padding: 15,
        width: '100%',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,

    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
        fontWeight: '600',
        color: 'gray'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5
    }

})