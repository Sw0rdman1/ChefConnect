import { View } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyProfileHeader from "@/components/main/my-profile/MyProfileHeader";
import ProfileActions from "@/components/main/my-profile/ProfileActions";
import UserRecipes from "@/components/main/my-profile/UserRecipes";

const MyProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { backgroundDarker } = useColors();

  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: top + 30, backgroundColor: backgroundDarker },
      ]}
    >
      <MyProfileHeader />
      <UserRecipes />
      <ProfileActions />
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
