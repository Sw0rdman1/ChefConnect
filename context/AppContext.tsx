import User from '@/models/User';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/config/supabase';
import { snakeToCamel } from '@/utils/caseConverter';



interface AppContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextProps>({
    user: null,
    setUser: () => { },
});

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { user: authUser } = useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser) {
                const { data } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authUser.id)
                    .single();


                setUser(snakeToCamel(data));
            } else {
                setUser(null);
            }
        };

        fetchUser();

    }, [authUser])

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppContext');
    }
    return context;
}