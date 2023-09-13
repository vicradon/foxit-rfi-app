import { User } from "@/interfaces";
import MainLayout from "@/layouts/MainLayout";
import { useCreateEnvelopeFromTemplate } from "@/services/template";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

interface ISigner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  permission: string;
}

const defaultSigner = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  permission: "FILL_FIELDS_AND_SIGN",
};

export default function Details() {
  const router = useRouter();
  const toast = useToast();
  const [folderName, setFolderName] = useState("");
  const createEnvelopeMutation = useCreateEnvelopeFromTemplate();
  const [signers, setSigners] = useState<ISigner[]>([
    {
      id: uuid(),
      ...defaultSigner,
    },
  ]);

  const addSigner = () => {
    setSigners([...signers, { id: uuid(), ...defaultSigner }]);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    signerId: string
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLSelectElement;

    const modifiedSigners = signers.map((signer) => {
      if (signer.id === signerId) {
        return {
          ...signer,
          [name]: value,
        };
      }
      return signer;
    });

    setSigners(modifiedSigners);
  };

  const removeSigner = (id: string) => {
    const modifiedSigners = signers.filter((signer) => signer.id !== id);
    setSigners(modifiedSigners);
  };

  const mapSignersToParties = (signers: ISigner[]): User[] => {
    return signers.map((signer, index) => ({
      firstName: signer.firstName,
      lastName: signer.lastName,
      emailId: signer.email,
      phone: signer.phone,
      permission: signer.permission,
      workflowSequence: index + 1,
      sequence: index + 1,
      hostEmailId: "",
      allowNameChange: true,
      signerAuthLevel: "Email Access Code",
    }));
  };

  const sendToSigners = async (event: FormEvent) => {
    event.preventDefault();

    await createEnvelopeMutation.mutateAsync({
      folderName,
      templateId: Number(router.query.templateId),
      parties: mapSignersToParties(signers),
    });

    if (createEnvelopeMutation.isSuccess) {
      toast({
        status: "success",
        title: "Successfully created document and sent to parties",
      });
      router.push("/");
    }
  };

  return (
    <MainLayout>
      <Container maxW={"container.lg"}>
        <Link href={"/"}>
          <span> &#8592; </span>
          <span> Go back</span>
        </Link>
        <Box my={8}>
          <Heading as={"h1"} fontSize={"2xl"}>
            Create RFI from template
          </Heading>
          <Box margin={"auto"} as={"form"} py={4} onSubmit={sendToSigners}>
            <FormControl isRequired>
              <FormLabel>Folder Name</FormLabel>
              <Input
                required
                value={folderName}
                onChange={({ target }) => setFolderName(target.value)}
              />
            </FormControl>

            <Box my={8}>
              <Heading as={"h2"} fontSize={"xl"}>
                Recipients
              </Heading>
              {signers.map((signer, index) => (
                <Grid mb={12} rowGap={4} key={signer.id}>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading as={"h2"} fontSize={"lg"}>
                      Signer {index + 1}
                    </Heading>

                    <Button
                      title={"remove signer"}
                      onClick={() => removeSigner(signer.id)}
                    >
                      X
                    </Button>
                  </Flex>
                  <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input
                      required
                      name={"firstName"}
                      value={signer.firstName}
                      onChange={(event) => handleInputChange(event, signer.id)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      required
                      name={"lastName"}
                      value={signer.lastName}
                      onChange={(event) => handleInputChange(event, signer.id)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      required
                      name={"email"}
                      value={signer.email}
                      onChange={(event) => handleInputChange(event, signer.id)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone number</FormLabel>
                    <Input
                      name={"phone"}
                      value={signer.phone}
                      onChange={(event) => handleInputChange(event, signer.id)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Permission</FormLabel>
                    <Select
                      onChange={(event) => handleInputChange(event, signer.id)}
                      value={signer.permission}
                    >
                      <option value={"EDIT_AND_SIGN"}>Edit and Sign</option>
                      <option value={"FILL_FIELDS_AND_SIGN"}>
                        Fill fields and sign
                      </option>
                      <option value={"FILL_FIELDS_ONLY"}>
                        Fill fields only
                      </option>
                      <option value={"VIEW_ONLY"}>View only</option>
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Box>

            <ButtonGroup display={"flex"} justifyContent={"flex-end"}>
              <Button onClick={addSigner}>Add Signer</Button>
              <Button type="submit" colorScheme={"blue"}>
                Send
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
