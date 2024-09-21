import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { AppProvider } from "@/context/AppContext";
import { RecipeProvider } from "@/context/RecipesContext";
import { ChatProvider } from "@/context/ChatContext";
import { MessageProvider } from "@/context/MessagesContext";

export default function MainScreenLayout() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && !user) {
    return <Redirect href="/(auth)/log-in" />;
  }


  return (
    <AppProvider>
      <RecipeProvider>
        <ChatProvider>
          <MessageProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                  animation: "fade_from_bottom",
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="(my-profile)"
                options={{ headerShown: false, animation: "fade_from_bottom" }}
              />
              <Stack.Screen
                name="(recipe)/[recipeID]"
                options={{ headerShown: false, animation: "fade_from_bottom" }}
              />
              <Stack.Screen
                name="(user)/[userID]"
                options={{ headerShown: false, animation: "fade_from_bottom" }}
              />
            </Stack>
          </MessageProvider>
        </ChatProvider>
      </RecipeProvider>
    </AppProvider>
  );
}
