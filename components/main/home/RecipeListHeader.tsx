import { StyleSheet } from "react-native";
import { Text, View } from "../../ui/Themed";
import Avatar from "../../ui/Avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import { BlurView } from "expo-blur";

const RecipeListHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useApp();

  const generateMeal = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "breakfast?"
    } else if (currentHour < 18) {
      return "lunch?"
    }
    return "dinner?"
  }

  const generateGreeting = () => {
    if (user?.displayName) {
      return `Hi, ${user?.displayName.split(' ')[0]} 👋🏻`
    } else {
      return "Hi there 👋🏻"
    }
  }

  return (
    <BlurView intensity={100} style={[styles.container, { paddingTop: top + 10 }]}>
      <View style={styles.leftSide}>
        <Text style={[styles.subtitle]}>{generateGreeting()}</Text>
        <Text style={[styles.title]}>{`What would you like to eat for ${generateMeal()}`}</Text>
      </View>
      <Avatar size={50} source={user?.profilePicture} />

    </BlurView>
  );
};

export default RecipeListHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "gray",
  },
  leftSide: {
    flex: 1,
    gap: 5,
    backgroundColor: "transparent",
  },
  circle: {
    position: 'absolute',
    right: -100,
    top: -50,
    width: 200,
    height: 200,
    borderRadius: 150,
  }

});
