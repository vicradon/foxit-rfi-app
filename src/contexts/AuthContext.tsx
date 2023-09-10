import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLogin } from "@/services/auth";
import { Box, Button, Flex } from "@chakra-ui/react";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginMutation = useLogin();

  useEffect(() => {
    if (!loginMutation.isIdle && loginMutation.isSuccess) {
      setIsAuthenticated(true);
    }
  }, [loginMutation]);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("access_token")));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
