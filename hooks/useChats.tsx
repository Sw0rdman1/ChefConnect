import { useToast } from "@/context/ToastNotificationContext";
import { Chat } from "@/models/Chat";
import { getChats } from "@/services/ChatService";
import { useEffect, useState } from "react";

export const useChats = (userID: string) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChats(userID);
        console.log(chats);
        setChats(chats);
        setLoading(false);
      } catch (error) {
        showToast({
          severity: "error",
          text: "Failed to fetch chats",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chats, loading };
};
