import ChatListItem from "@/components/main/chat/ChatListItem";
import InboxHeader from "@/components/main/chat/InboxHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { supabase } from "@/config/supabase";
import { useChats } from "@/context/ChatContext";
import { getMessageFromRealtimeEvent } from "@/services/ChatService";
import { useEffect } from "react";

const InboxScreen = () => {
  const { chats, loading, markChatAsRead, setLastMessage, addUnreadMessage } = useChats();

  const hanleNewMessageInsert = (payload: any) => {
    console.log('inox');
    const newMessage = getMessageFromRealtimeEvent(payload)
    setLastMessage(newMessage)
    addUnreadMessage(newMessage.chatID)
  }

  useEffect(() => {
    const channel =
      supabase
        .channel('messagesInbox')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          hanleNewMessageInsert
        )
        .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])



  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0]}>
        <InboxHeader />
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} markChatAsRead={markChatAsRead} />
        ))}
      </ScrollView>
    </View>
  );
};

export default InboxScreen;


