import { Chat } from '@/models/Chat';
import { getChats, markMessagesAsRead } from '@/services/ChatService';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastNotificationContext';
import { useApp } from './AppContext';
import { Message } from '@/models/Message';
import { useAuth } from './AuthContext';

interface ChatContextProps {
    chats: Chat[];
    loading: boolean;
    markChatAsRead: (chatID: string) => Promise<void>;
    setLastMessage: (message: Message) => void;
    addUnreadMessage: (chatID: string) => void;
}

export const ChatContext = createContext<ChatContextProps>({
    chats: [],
    loading: true,
    markChatAsRead: async () => { },
    setLastMessage: () => { },
    addUnreadMessage: () => { },
});

interface ChatProviderProps {
    children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user } = useAuth();

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

    const markChatAsRead = async (chatID: string) => {
        const chat = chats.find((chat) => chat.id === chatID);
        if (chat) {
            chat.unreadCount = 0;
            setChats([...chats]);
            await markMessagesAsRead(chatID)
        }
    }

    const setLastMessage = (message: Message) => {
        setChats((prevChats) => {
            const updatedChats = prevChats.map((chat) => {
                if (chat.id === message.chatID) {
                    return {
                        ...chat,
                        lastMessage: message,
                    };
                }
                return chat;
            });
            return updatedChats;
        });
    }

    const addUnreadMessage = (chatID: string) => {
        setChats((prevChats) => {
            const updatedChats = prevChats.map((chat) => {
                if (chat.id === chatID) {
                    return {
                        ...chat,
                        unreadCount: chat.unreadCount + 1,
                    };
                }
                return chat;
            });
            return updatedChats;
        });
    }


    return (
        <ChatContext.Provider value={{ chats, loading, markChatAsRead, setLastMessage, addUnreadMessage }}>
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