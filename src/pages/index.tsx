import { useState } from "react";
import { useFetchTemplates } from "@/services/template";
import { Template } from "@/interfaces";
import Link from "next/link";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Documents from "@/components/Documents";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const templatesQuery = useFetchTemplates(isAuthenticated);
  const [selectedTemplate, setSelectedTemplate] = useState<null | number>();

  return (
    <MainLayout>
      <Box padding={8}>
        {!isAuthenticated && (
          <Flex justifyContent={"center"}>
            <Text>Login to see templates</Text>
          </Flex>
        )}
        {isAuthenticated && (
          <div className="container mx-auto px-8">
            <Heading as={"h2"} fontSize={"xl"}>
              Choose Template
            </Heading>

            {/* Add template list code here */}

            <Flex justifyContent={"flex-end"}>
              {selectedTemplate && (
                <Link href={`/rfi/${selectedTemplate}`}>
                  <Button colorScheme={"blue"}>Generate RFI</Button>
                </Link>
              )}
            </Flex>

            {/* Add document-related code here */}

          </div>
        )}
      </Box>
    </MainLayout>
  );
}
