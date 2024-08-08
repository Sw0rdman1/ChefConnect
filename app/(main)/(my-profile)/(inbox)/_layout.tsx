import { ChatProvider } from "@/context/ChatContext";
import { MessageProvider } from "@/context/MessagesContext";
import { Stack } from "expo-router";

export default function InboxLayout() {


  return (
    <ChatProvider>
      <MessageProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[chatID]" options={{ headerShown: false }} />
          <Stack.Screen
            name="new-chat"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </MessageProvider>
    </ChatProvider>
  );
}
