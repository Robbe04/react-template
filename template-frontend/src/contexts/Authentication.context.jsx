import {createContext, useState, useCallback, useMemo} from 'react';
import useSWRMutation from 'swr/mutation'; 
import * as api from '../api'; 
import useSWR from 'swr';

export const JWT_TOKEN_KEY = 'jwtToken';
export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));

  const {data: user, loading: userLoading, error: userError} = useSWR(
    token ? 'users/me' : null, api.getById
  );
console.log(user);
console.log(userError);
  const {trigger: doLogin, isMutating: loginLoading, error: loginError} = useSWRMutation(
    'sessions', api.post
  ); 

  const login = useCallback(async (emailadres, password) => {
      try {
        const { token } = await doLogin({emailadres, password});

        console.log(token);

        setToken(token); 

        localStorage.setItem(JWT_TOKEN_KEY, token);

        return true; 
      } catch (error) {
          console.error(error);
          return false;
      }
    },
    [doLogin],
  );

  const logout = useCallback(() => {
    setToken(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      error: loginError || userError,
      loading: loginLoading || userLoading,
      isAuthed: Boolean(token),
      ready: !userLoading,
      login,
      logout,
    }),
    [
      token,
      user,
      loginError,
      loginLoading,
      userError,
      userLoading,
      login,
      logout,
    ],
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};