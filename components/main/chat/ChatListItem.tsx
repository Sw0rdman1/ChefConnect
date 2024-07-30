import Avatar from "@/components/ui/Avatar";
import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { Chat } from "@/models/Chat";
import { StyleSheet, View } from "react-native";

interface ChatListItemProps {
  chat: Chat;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  const { text } = useColors();
  return (
    <View style={[styles.container, { borderBottomColor: `${text}20` }]}>
      <Avatar size={55} source={chat.participant.profilePicture} />
      <View style={styles.textContainer}>
        <Text style={styles.displayName}>{chat.participant.displayName}</Text>
        <Text style={styles.message}>{chat.lastMessage?.text}</Text>
      </View>
    </View>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 100,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  displayName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    color: "gray",
  },
});
