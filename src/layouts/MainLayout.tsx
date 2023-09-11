import React, { ReactNode, useContext, useEffect } from "react";
import { useLogin } from "@/services/auth";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const loginMutation = useLogin();

  useEffect(() => {
    if (!loginMutation.isIdle && loginMutation.isSuccess)
      setIsAuthenticated(false);
  }, [loginMutation.isSuccess]);

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <Box as="main" minHeight={"100vh"}>
      <Flex justifyContent={"space-between"} padding={8}>
        <h1 className="text-2xl font-medium">Contoso Construction RFI</h1>

        {!isAuthenticated && (
          <Button colorScheme={"blue"} onClick={() => loginMutation.mutate()}>
            Login
          </Button>
        )}
        {isAuthenticated && <Button onClick={logout}>Logout</Button>}
      </Flex>

      {children}
    </Box>
  );
}
