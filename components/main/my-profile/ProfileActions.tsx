import { Text, View } from "@/components/ui/Themed";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ActionProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
  pageToGo?: string;
  logOut?: boolean;
}

const Action: React.FC<ActionProps> = ({ icon, text, pageToGo, logOut }) => {
  const { text: textColor, tint } = useColors();
  const { signOut } = useAuth();

  const goToPageHandler = (page: string) => {
    router.push(`/${page}`);
  };

  const handlePress = () => {
    if (logOut) {
      signOut();
    } else if (pageToGo) {
      goToPageHandler(pageToGo);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.actionContainer, { borderBottomColor: `${textColor}10` }]}
    >
      <View style={styles.leftSide}>
        {icon && (
          <Ionicons name={icon} size={28} color={logOut ? "red" : "gray"} />
        )}
        <Text
          style={[styles.actionName, { color: logOut ? "red" : textColor }]}
        >
          {text}
        </Text>
      </View>
      <View style={styles.rightSide}>
        <Ionicons
          name="chevron-forward"
          size={28}
          color={logOut ? "red" : textColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const ProfileActions = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Action
        icon="person-outline"
        text="Edit profile"
        pageToGo="edit-profile"
      />
      <Action icon="log-out-outline" text="Log out" logOut />
    </View>
  );
};

export default ProfileActions;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  actionContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionName: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "500",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
