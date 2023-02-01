import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";

export default function Socials() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="elevated"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack>
        <CardBody display="flex">
          <Heading size="md">Buy me a coffe</Heading>
        </CardBody>
      </Stack>
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
    </Card>
  );
}
