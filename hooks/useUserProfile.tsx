import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { getRecipesByUserID } from "@/services/RecipeService";
import { getUserByID } from "@/services/UserService";
import { useEffect, useState } from "react";

export const useUserProfile = (userID: string, withRecipes: boolean) => {
    const [user, setUser] = useState<User | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user: currentUser } = useApp();

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const user = await getUserByID(userID);

                if (!user) {
                    throw new Error("User not found");
                }

                setUser(user);

                if (withRecipes) {
                    const recipes = await getRecipesByUserID(userID, currentUser?.id as string);
                    setRecipes(recipes);
                }

            } catch (error) {
                showToast({
                    severity: "error",
                    text: "Failed to fetch user",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [userID]);

    return { loading, user, recipes };
};
