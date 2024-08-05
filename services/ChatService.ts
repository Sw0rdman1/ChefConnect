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

  console.log(messages);


  if (error) {
    console.log(error);
    throw error;
  }

  return snakeToCamel(messages[0]) as Message;
}

export const getChats = async (userID: string) => {
  const { data: chats, error } = await supabase
    .from("chats")
    .select("*, first_user_id(*), second_user_id(*), last_message(*)")
    .or(`first_user_id.eq.${userID},second_user_id.eq.${userID}`);

  if (error) {
    console.log(error);
    throw error;
  }


  const chatFormatted = await Promise.all(
    snakeToCamel(chats).map(async (chat: any) => {
      const lastMessage = await getLastMessage(chat.id);
      console.log(lastMessage);
      return {
        id: chat.id,
        lastMessage,
        participant:
          chat.firstUserId.id === userID ? chat.secondUserId : chat.firstUserId,
        unreadCount: chat.unreadCount || 0,
        createdAt: chat.createdAt,
      } as Chat;
    })
  );

  console.log(chatFormatted);


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

  return {
    chat: snakeToCamel(chatFormatted),
    messages: snakeToCamel(messages) as Message[]
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
