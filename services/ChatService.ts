import { supabase } from "@/config/supabase";
import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { snakeToCamel } from "@/utils/caseConverter";

export const getChats = async (userID: string) => {
  const { data: chats, error } = await supabase
    .from("chats")
    .select("*, first_user_id(*), second_user_id(*), last_message(*)")
    .or(`first_user_id.eq.${userID},second_user_id.eq.${userID}`);

  if (error) {
    console.log(error);
    throw error;
  }

  const chatFormatted = snakeToCamel(chats).map((chat: any) => {
    return {
      id: chat.id,
      lastMessage: chat.lastMessage,
      participant:
        chat.firstUserId.id === userID ? chat.secondUserId : chat.firstUserId,
      unreadCount: chat.unreadCount || 0,
      createdAt: chat.createdAt,
    } as Chat;
  });

  return chatFormatted;
};

export const getChatWithMessages = async (userID: string, chatID: string) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatID)
    .order("created_at", { ascending: true });

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
