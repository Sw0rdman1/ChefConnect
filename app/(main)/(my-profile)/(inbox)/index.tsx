import ChatListItem from "@/components/main/chat/ChatListItem";
import InboxHeader from "@/components/main/chat/InboxHeader";
import AnimatedHeader from "@/components/ui/AnimatedHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { useApp } from "@/context/AppContext";
import { useChats } from "@/hooks/useChats";
import { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const InboxScreen = () => {
  const { user } = useApp();
  const { chats, loading } = useChats(user?.id as string);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.homeContainer}>
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

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
