import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { getChatWithMessages } from "@/services/ChatService";
import { useEffect, useState } from "react";

export const useMessages = (chatID: string) => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user } = useApp();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (!user) return;
                const { chat, messages } = await getChatWithMessages(user?.id, chatID);
                setMessages(messages);
                setSelectedChat(chat);
                setLoading(false);
            }
            catch (error) {
                console.log(error);

                showToast({
                    severity: "error",
                    text: "Failed to fetch messages",
                });
            }
            finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);
    return { selectedChat, messages, loading, setMessages };
}