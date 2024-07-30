import { supabase } from "@/config/supabase";
import { Chat } from "@/models/Chat";
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
