import { useAuth } from "@/contexts/AuthContext";
import { useFetchDocuments } from "@/services/documents";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Table,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

type FolderStatusTypes = "SHARED" | "EXECUTED";

export default function Documents() {
  const { isAuthenticated } = useAuth();
  const fetchDocumentsQuery = useFetchDocuments(isAuthenticated);

  const bgColorByFolderStatus = {
    SHARED: "orange.200",
    EXECUTED: "green.200",
    NONE: "white",
  };

  const desiredDocumentProperties = (document: Record<string, any>) => ({
    status: document?.folder?.folderStatus,
  });

  return (
    <Box>
      <Heading as={"h2"} fontSize={"xl"}>
        Created Documents
      </Heading>

      <Box my={4}>
        {fetchDocumentsQuery.data?.map((document: any) => {
          return (
            <Accordion>
              <AccordionItem>
                <AccordionButton
                  bgColor={
                    bgColorByFolderStatus[
                      (document?.folder?.folderStatus as FolderStatusTypes) ||
                        "NONE"
                    ]
                  }
                  rounded={"md"}
                  border={"1px solid"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Text>{document?.folder?.folderName}</Text>

                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <Heading as="h3" fontSize={"lg"}>
                    Document Details
                  </Heading>
                  <Table>
                    {Object.entries(desiredDocumentProperties(document)).map(
                      ([key, value]) => {
                        return (
                          <Tr>
                            <Td>{key}</Td>
                            <Td>{value}</Td>
                          </Tr>
                        );
                      }
                    )}
                  </Table>

                  <Box my={4}>
                    <Heading as="h3" fontSize={"lg"}>
                      Party Details
                    </Heading>
                    <Box>
                      {document?.folder?.folderRecipientParties?.map(
                        (party: Record<string, any>) => {
                          return (
                            <Table mb={4}>
                              <Tr>
                                <Td>First name</Td>
                                <Td>{party.partyDetails.firstName}</Td>
                              </Tr>

                              <Tr>
                                <Td>Last name</Td>
                                <Td>{party.partyDetails.lastName}</Td>
                              </Tr>

                              <Tr>
                                <Td>Email</Td>
                                <Td>{party.partyDetails.emailId}</Td>
                              </Tr>
                            </Table>
                          );
                        }
                      )}
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
