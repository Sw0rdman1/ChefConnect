import { TextInput, View } from "@/components/ui/Themed";
import { StyleSheet } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useRecipesContext } from "@/context/RecipesContext";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useRecipesContext();
  const { text, backgroundDarker, placeholderText } = useColors();

  return (
    <View
      style={[styles.inputContainer, { backgroundColor: backgroundDarker }]}
    >
      <Ionicons name="search" size={24} color={text} />
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search recipes by name"
        placeholderTextColor={placeholderText}
        style={[styles.textInput, { color: text }]}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: 'transparent'
  },
});
