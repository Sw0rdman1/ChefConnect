import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import User from "@/models/User";
import { getUserByID } from "@/services/UserService";
import { useEffect, useState } from "react";

export const useUserProfile = (userID: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const user = await getUserByID(userID);

                if (!user) {
                    throw new Error("User not found");
                }

                setUser(user);

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

    return { loading, user };
};
