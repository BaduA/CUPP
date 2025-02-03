import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { signIn } from './auth_calls';

const AuthContext = createContext<{
    signInSession: (data: any) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signInSession: (data: any) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('token');
    return (
        <AuthContext.Provider
            value={{
                signInSession: (token:string) => {
                    setSession(token);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
