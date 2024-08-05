import { supabase } from "@/config/supabase";
import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { snakeToCamel } from "@/utils/caseConverter";

const getLastMessage = async (chatID: string) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatID)
    .order("created_at", { ascending: false })
    .limit(1);


  if (error) {
    console.log(error);
    throw error;
  }

  messages[0].created_at = new Date(messages[0].created_at);
  return snakeToCamel(messages[0]) as Message;
}

const getUnredMessageCount = async (chatID: string, userID: string) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatID)
    .neq("user_id", userID)
    .eq("is_read", false)

  if (error) {
    console.log(error);
    throw error;
  }

  return messages.length;
}

export const getChats = async (userID: string) => {
  const { data: chats, error } = await supabase
    .from("chats")
    .select("*, first_user_id(*), second_user_id(*)")
    .or(`first_user_id.eq.${userID},second_user_id.eq.${userID}`);

  if (error) {
    console.log(error);
    throw error;
  }


  const chatFormatted = await Promise.all(
    snakeToCamel(chats).map(async (chat: any) => {
      const lastMessage = await getLastMessage(chat.id);
      const unreadMessageCount = await getUnredMessageCount(chat.id, userID);

      return {
        id: chat.id,
        lastMessage,
        participant:
          chat.firstUserId.id === userID ? chat.secondUserId : chat.firstUserId,
        unreadCount: unreadMessageCount,
        createdAt: new Date(chat.createdAt),
      } as Chat;
    })
  );


  return chatFormatted;
};

export const getChatWithMessages = async (userID: string, chatID: string) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatID)
    .order("created_at", { ascending: false })

  if (error) {
    console.log(error);
    throw error;
  }

  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .select("*, first_user_id(*), second_user_id(*)")
    .eq("id", chatID)
    .single();


  if (chatError || !chat) {
    console.log(chatError);
    throw chatError;
  }


  const chatFormatted = {
    id: chatID,
    participant:
      chat.first_user_id.id === userID ? chat.second_user_id : chat.first_user_id,
  } as Chat;

  const messagesFormatted = messages.map((message: any) => {
    message.created_at = new Date(message.created_at);
    return snakeToCamel(message) as Message;
  });

  return {
    chat: snakeToCamel(chatFormatted),
    messages: messagesFormatted as Message[]
  };
}

export const sendMessage = async (chatID: string, text: string) => {
  const user = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated");
  }
  const userID = user.data.user?.id;

  const { error } = await supabase
    .from("messages")
    .insert({
      chat_id: chatID,
      user_id: userID,
      text,
      created_at: new Date().toISOString(),
    })

  if (error) {
    console.log(error);
    throw error;
  }

  return {
    id: Math.random().toString(),
    chatID,
    text,
    userId: userID,
    isRead: false,
    createdAt: new Date(),
  } as Message;
}

export const markMessagesAsRead = async (chatID: string) => {
  const user = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated");
  }
  const userID = user.data.user?.id;

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("chat_id", chatID)
    .neq("user_id", userID)

  if (error) {
    console.log(error);
    throw error;
  }
}


export const getMessageFromRealtimeEvent = (payload: any) => {
  const newMessage = snakeToCamel(payload.new)
  return {
    chatID: newMessage.chatId,
    text: newMessage.text,
    userId: newMessage.userId,
    isRead: newMessage.isRead,
    createdAt: new Date(newMessage.createdAt),
  } as Message;
}
