import RecipeCard from '@/components/main/home/RecipeCard';
import UserProfileRecipeCard from '@/components/main/user-profile/UserProfileRecipeCard';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Text, View } from '@/components/ui/Themed';
import { useColors } from '@/hooks/useColors';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <TouchableOpacity
                    onPress={openChatHandler}
                    style={[styles.chatButton, { backgroundColor: tint }]}
                >
                    <Ionicons name="chatbubble-ellipses" size={24} color={"white"} />
                </TouchableOpacity>
            </View>


            <View style={styles.recipeTitleContainer}>
                <Text style={[styles.recipeTitle, { color: tint }]}>{recipes.length}</Text>
                <Text style={styles.recipeTitle}>Recipes</Text>
            </View>
            <FlatList
                style={{ width: '100%' }}
                data={recipes}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(recipe) => recipe.id}
                renderItem={({ item: recipe }) => (
                    <UserProfileRecipeCard recipe={recipe} />
                )}
            />
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
        zIndex: 1
    },
    chatButton: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        right: 10,
        top: -USER_CARD_HEIGHT / 2
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
    },
    recipeTitleContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignSelf: 'flex-start',
        paddingRight: 30,
        marginBottom: 10
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }

})