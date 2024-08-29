import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { StyleSheet, View } from "react-native";

interface Props {
  instructions: string[];
}

const RecipeInstructions: React.FC<Props> = ({ instructions }) => {
  const { tint } = useColors();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      {instructions.length > 0 && instructions.map((instruction, index) => (
        <View key={index} style={styles.instruction}>
          <Text
            style={[
              styles.instructionText,
              { color: tint, fontWeight: "bold" },
            ]}
          >
            {index + 1}.
          </Text>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      ))}
    </View>
  );
};

export default RecipeInstructions;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 20,
  },
  instruction: {
    paddingRight: 25,
    flexDirection: "row",
    marginBottom: 15,
    marginLeft: 5,
    gap: 10,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
