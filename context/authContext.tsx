'use client';

import Cookies from 'js-cookie';
import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

type AuthTokens = {
  token: string;
  refresh_token: string;
};

export const AuthContext = createContext({
  login: (authTokens: AuthTokens) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const login = useCallback(function (authTokens: AuthTokens) {
    Cookies.set('authTokens', JSON.stringify(authTokens));
  }, []);

  const logout = useCallback(function () {
    Cookies.remove('authTokens');
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
