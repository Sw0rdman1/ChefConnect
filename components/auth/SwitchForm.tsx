import { StyleSheet } from "react-native";
import { Text } from "../ui/Themed";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";

const SwitchForm = ({ isLogin }: { isLogin: boolean }) => {
  const { tint } = useColors();
  const pageToGo = isLogin ? "/registration" : "/log-in";
  const text1 = isLogin ? "Don't have an account?" : "Already have an account?";
  const text2 = isLogin ? "Sign Up" : "Log In";

  return (
    <Text style={styles.container}>
      {text1}{" "}
      <Text
        onPress={() => {
          router.push(pageToGo);
        }}
        style={{ color: tint, fontWeight: "700" }}
      >
        {text2}
      </Text>
    </Text>
  );
};

export default SwitchForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "700",
  },
});
