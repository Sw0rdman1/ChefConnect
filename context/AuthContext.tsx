import { createContext, useContext, useEffect, useState } from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/config/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<AuthError | void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<AuthError | void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });

        if (!error) {
          if (
            credential.fullName?.givenName &&
            credential.fullName?.familyName
          ) {
            const display_name =
              credential.fullName?.givenName +
              " " +
              credential.fullName?.familyName;

            await supabase.auth.updateUser({
              data: {
                display_name,
              },
            });

            await supabase
              .from("users")
              .update({
                display_name,
              })
              .eq("id", user?.id);

            setUser(user);
          }
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if ((e as any).code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  async function signInWithEmail(email: string, password: string) {
    if (!email || !password) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Error signing in:", error.message);
      return error;
    }
  }

  async function signUpWithEmail(
    email: string,
    password: string,
    displayName: string
  ) {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { display_name: displayName } },
    });

    if (error) {
      console.log("Error signing up:", error.message);
      return error;
    }
  }

  const AuthContextValue: AuthContextType = {
    user,
    session,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithApple,
    signOut,
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
