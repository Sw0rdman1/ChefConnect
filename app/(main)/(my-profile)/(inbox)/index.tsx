import ChatListItem from "@/components/main/chat/ChatListItem";
import InboxHeader from "@/components/main/chat/InboxHeader";
import NoChats from "@/components/main/chat/NoChats";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { supabase } from "@/config/supabase";
import { useChats } from "@/context/ChatContext";
import { getMessageFromRealtimeEvent } from "@/services/ChatService";
import { useEffect } from "react";

const InboxScreen = () => {
  const { chats, loading, markChatAsRead, setLastMessage, addUnreadMessage } = useChats();
  const displayChats = chats.filter((chat) => chat.lastMessage);

  console.log('chats', chats)
  console.log('displayChats', displayChats);


  const hanleNewMessageInsert = (payload: any) => {
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
        {displayChats.length > 0 ?
          displayChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} markChatAsRead={markChatAsRead} />
          )) :
          <NoChats />
        }
      </ScrollView>
    </View>
  );
};

export default InboxScreen;


