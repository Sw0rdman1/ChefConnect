import SearchChat from "@/components/main/chat/SearchChat";
import SearchResult from "@/components/main/chat/SearchResult";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Text, View } from "@/components/ui/Themed";
import { useChats } from "@/context/ChatContext";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const NewChatModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users, loading } = useUsers(searchTerm);


  return (
    <View style={styles.container}>
      <SearchChat searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Text style={styles.title}>
        Select a user to start messaging
      </Text>
      {loading ?
        <LoadingScreen /> :
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchResult user={item} />
          )}
        />}
    </View>
  );
};

export default NewChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 15,
  },
});
