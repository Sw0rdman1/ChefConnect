import { Chat } from "@/models/Chat";
import { getChats } from "@/services/ChatService";
import { useEffect, useState } from "react";

export const useChats = (userID: string) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats(userID);
      setChats(chats);
      setLoading(false);
    };

    fetchChats();
  }, []);

  return { chats, loading };
};
