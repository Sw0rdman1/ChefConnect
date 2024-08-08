import ChatHeader from "@/components/main/chat/ChatHeader";
import Message from "@/components/main/chat/Message";
import MessageInput from "@/components/main/chat/MessageInput";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Text, View } from "@/components/ui/Themed";
import { supabase } from "@/config/supabase";
import { useChats } from "@/context/ChatContext";
import { useMessages } from "@/context/MessagesContext";
import { useColors } from "@/hooks/useColors";
import { Message as MessageEntity } from "@/models/Message";
import { getMessageFromRealtimeEvent } from "@/services/ChatService";
import { generateDateText, isDayChanged } from "@/utils/time";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";

const MessageDateSeparator = ({ date }: { date: Date }) => {

  return (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{generateDateText(date)}</Text>
    </View>
  );
}

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { loading, selectedChat, messages, setSelectedChatID, addNewMessage } = useMessages()
  const { background } = useColors();
  const { markChatAsRead, setLastMessage } = useChats();


  const hanleNewMessageInsert = async (payload: any) => {
    const newMessage = getMessageFromRealtimeEvent(payload)
    addNewMessage(newMessage)
    setLastMessage(newMessage)

    if (newMessage) {
      await markChatAsRead(newMessage.chatID)
    }
  }


  useEffect(() => {
    const channel =
      supabase
        .channel('messagesChat')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          hanleNewMessageInsert
        )
        .subscribe()

    return () => {
      supabase.removeChannel(channel)
      setSelectedChatID('');
    }
  }, [chatID]);


  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) {
    return null;
  }


  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: background }]}
      behavior="padding"
    >
      <ChatHeader selectedChat={selectedChat} />
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <>
            <Message message={item} />
            {index === messages.length - 1 || isDayChanged(item.createdAt, messages[index + 1].createdAt) ? (
              <MessageDateSeparator date={item.createdAt} />
            ) : null}
          </>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 150, backgroundColor: background, flexGrow: 1 }}
        inverted
      />
      <MessageInput chatID={chatID} />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateSeparator: {
    alignItems: "center",
    padding: 5,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  dateText: {
    color: "gray",
  },
});
