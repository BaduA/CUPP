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
    const signInFunction:any = signIn()
    return (
        <AuthContext.Provider
            value={{
                signIn: async (data: any) => {
                    var token = await signInFunction.mutate(data)
                    if (signInFunction.isError) {
                        console.log(signInFunction.error.response.data)
                    } else if (signInFunction.isSuccess) {
                        console.log(signInFunction.data)
                    }
                    else if (signInFunction.isLoading) {
                        console.log("loading")
                    }
                    setSession(null);
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
