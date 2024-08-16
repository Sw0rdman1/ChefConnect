import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import User from "@/models/User";
import { getUsersByName } from "@/services/UserService";
import { useEffect, useState } from "react";

export const useUsers = (searchTerm: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { user } = useApp();

    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                const users = await getUsersByName(searchTerm);

                const filteredUsers = users.filter((u) => u.id !== user?.id);
                setUsers(filteredUsers);

            } catch (error) {
                showToast({
                    severity: "error",
                    text: "Failed to fetch users",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [searchTerm]);

    return { users, loading }
}