import MainLayout from "@/layouts/MainLayout";
import { Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const documentId = router.query.documentId;

  return (
    <MainLayout>
      <Container maxW={"container.xl"}>
        <Heading fontSize={"xl"}>Documents</Heading>
      </Container>
    </MainLayout>
  );
}
