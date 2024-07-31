import ChatListItem from "@/components/main/chat/ChatListItem";
import InboxHeader from "@/components/main/chat/InboxHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { useChats } from "@/hooks/useChats";

const InboxScreen = () => {
  const { chats, loading } = useChats();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0]}>
        <InboxHeader />
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ScrollView>
    </View>
  );
};

export default InboxScreen;


