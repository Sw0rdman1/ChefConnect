import { supabase } from "@/config/supabase";
import User from "@/models/User";
import { snakeToCamel } from "@/utils/caseConverter";

export const getUserByID = async (userID: string): Promise<User | null> => {
    let { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userID)
        .single();

    if (error) {
        console.log(error);
        throw error;
    }

    if (user) {
        return snakeToCamel(user) as User;
    } else {
        return null;
    }
}