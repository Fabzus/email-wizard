import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { AiFillRobot } from "react-icons/ai";

import { FaLaugh } from "react-icons/fa";

import { IoRocket } from "react-icons/io5";
import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        minW={8}
        minH={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container maxW={"5xl"} py={12}>
      <Stack spacing={4}>
        <Text
          textTransform={"uppercase"}
          color={useColorModeValue("gray.700", "gray.50")}
          fontWeight={600}
          fontSize={"sm"}
          bg={useColorModeValue("gray.300", "gray.600")}
          p={2}
          alignSelf={"flex-start"}
          rounded={"md"}
        >
          The magic
        </Text>
        <Heading>Get Your Words Flowing with emailWizard!</Heading>
        <Text color={"gray.500"} fontSize={"lg"}>
          Sick of writer's block? Let the wizard be your trusty sidekick!
        </Text>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.100", "gray.700")}
            />
          }
        >
          <Feature
            icon={<Icon as={AiFillRobot} color={"#e6b5a8"} w={5} h={5} />}
            iconBg="#D77A61"
            text={
              "With the power of OpenAI, this email generator will have you writing like a pro in no time."
            }
          />
          <Feature
            icon={<Icon as={IoRocket} color={"#9fe4d8"} w={5} h={5} />}
            iconBg="#77ACA2"
            text={
              "No more staring at a blank screen wondering what to say - just let emailWizard do the work."
            }
          />
          <Feature
            icon={<Icon as={FaLaugh} color={"#F4E9CD"} w={5} h={5} />}
            iconBg=" #d6bd80"
            text={
              "Don't settle for just any email, let emailWizard add a little humor and flair to your words. Get started now!"
            }
          />
        </Stack>
      </Stack>
    </Container>
  );
}
