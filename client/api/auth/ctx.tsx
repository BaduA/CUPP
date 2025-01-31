import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { signIn } from './auth_calls';

const AuthContext = createContext<{
    signIn: (data: any) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (data: any) => null,
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
    const [[isLoading, session], setSession] = useStorageState('session');
    const signInFunction = signIn()
    return (
        <AuthContext.Provider
            value={{
                signIn: (data: any) => {
                    var token = signInFunction.mutate(data)
                    console.log(data)
                    setSession('xxx');
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
