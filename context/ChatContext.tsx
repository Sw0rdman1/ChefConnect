import { Chat } from '@/models/Chat';
import { getChats } from '@/services/ChatService';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastNotificationContext';
import { useApp } from './AppContext';
import { Message } from '@/models/Message';

interface ChatContextProps {
    chats: Chat[];
    loading: boolean;
    markChatAsRead: (chatID: string) => void;
    setLastMessage: (chatID: string, message: Message) => void;
}

export const ChatContext = createContext<ChatContextProps>({
    chats: [],
    loading: true,
    markChatAsRead: () => { },
    setLastMessage: () => { },
});

interface ChatProviderProps {
    children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user } = useApp();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                if (!user) return;
                const chats = await getChats(user?.id);
                setChats(chats);
                setLoading(false);
            } catch (error) {
                console.log(error);

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

    const markChatAsRead = (chatID: string) => {
        const chat = chats.find((chat) => chat.id === chatID);
        if (chat) {
            chat.unreadCount = 0;
            setChats([...chats]);
        }
    }

    const setLastMessage = (chatID: string, message: Message) => {
        const chat = chats.find((chat) => chat.id === chatID);
        if (chat) {
            chat.lastMessage = message;
            setChats([...chats]);
        }
    }


    return (
        <ChatContext.Provider value={{ chats, loading, markChatAsRead, setLastMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChats = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};