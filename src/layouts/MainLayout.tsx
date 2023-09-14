import { ReactNode } from "react";
import { useLogin } from "@/services/auth";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const loginMutation = useLogin();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  const handleLogin = async () => {
    await loginMutation.mutateAsync();

    if (loginMutation.isSuccess) {
      window.location.reload();
    }
  };

  return (
    <Box as="main" minHeight={"100vh"}>
      <Flex justifyContent={"space-between"} padding={8}>
        <h1 className="text-2xl font-medium">DeDraftersInc Construction Inc</h1>

        {!isAuthenticated && (
          <Button
            isLoading={loginMutation.isLoading}
            colorScheme={"blue"}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}

        {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
      </Flex>

      {children}
    </Box>
  );
}
