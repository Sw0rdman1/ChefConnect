import { Stack } from "expo-router";

export default function InboxLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[chatID]" options={{ headerShown: false }} />
    </Stack>
  );
}
