import { Chat } from '@/models/Chat';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastNotificationContext';
import { useApp } from './AppContext';
import { Message } from '@/models/Message';
import { getChatWithMessages } from '@/services/ChatService';

interface MessagesContextProps {
    selectedChat: Chat | null;
    messages: Message[];
    loading: boolean;
    setSelectedChatID: (chatID: string) => void;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    addNewMessage: (message: Message) => void;
}

export const MessagesContext = createContext<MessagesContextProps>({
    selectedChat: null,
    messages: [],
    loading: true,
    setSelectedChatID: () => { },
    setMessages: () => { },
    addNewMessage: () => { },
});

interface MessageProviderProps {
    children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [selectedChatID, setSelectedChatID] = useState<string>('');
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user } = useApp();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (!user) return;
                const { chat, messages } = await getChatWithMessages(user?.id, selectedChatID);
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

        if (selectedChatID) {
            fetchMessages();
        }

    }, [selectedChatID]);

    const addNewMessage = async (message: Message) => {
        setMessages((prev) => [message, ...prev]);
    }


    return (
        <MessagesContext.Provider value={{ addNewMessage, setMessages, selectedChat, messages, loading, setSelectedChatID }}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};