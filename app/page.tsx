"use client";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import Features from "../components/Features";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Stack,
  Divider,
  Checkbox,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Collapse,
  useToast,
} from "@chakra-ui/react";

import { SelectControl } from "formik-chakra-ui";

export default function Home() {
  const [gratitude, setGratitude] = useState("");
  const [gratitudeLoading, setGratitudeLoading] = useState(false);
  const [gratitudeLoadingError, setGratitudeLoadingError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailLoadingError, setEmailLoadingError] = useState(false);

  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const initialValuesEmail = {
    typeOf: "informal",
    recipient: "a boss",
    recipientName: "",
    subject: "",
    sender: "",
    addExtraInfo: false,
    extraInfo: "",
    funny: false,
  };

  async function repeat(prompt: string) {
    setGratitude("");
    setGratitudeLoadingError(false);
    setGratitudeLoading(true);
    setEmail("");
    setEmailLoading(false);
    setEmailLoadingError(false);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGratitude((prev) => prev + chunkValue);
    }

    setGratitudeLoading(false);
  }

  async function handleSubmit(
    typeOf: string,
    recipient: string,
    recipientName: string,
    subject: string,
    sender: string,
    extraInfo: string,
    funny: boolean
  ) {
    toast({
      title: "Message recived.",
      description: "Please be patient as we generate your email.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    const emailTemplate = `Write me a [typeof] letter for my [reciver] named [name] about [subject] from [sender]

    where typeof is ${typeOf},
    the reciver is ${recipient},
    named ${recipientName},
    the subject ${subject},
    sender is ${sender}
    
    please add '\n' where needed`;

    const emailTemplateFunny = `Write me a [typeof] letter for my [reciver] named [name] about [subject] from [sender]

    where typeof is ${typeOf},
    the reciver is ${recipient},
    named ${recipientName},
    the subject ${subject},
    sender is ${sender}

    make it funny!`;

    if (funny) {
      try {
        repeat(emailTemplateFunny);
      } catch (error) {
        console.error(error);
        setGratitudeLoadingError(true);
      } finally {
        setGratitudeLoading(false);
      }
    } else {
      try {
        repeat(emailTemplate);
      } catch (error) {
        console.error(error);
        setGratitudeLoadingError(true);
      } finally {
        setGratitudeLoading(false);
      }
    }
  }

  return (
    <main>
      <Flex
        p={5}
        bg={useColorModeValue("gray.50", "gray.700")}
        color={useColorModeValue("gray.700", "gray.200")}
        align="center"
        justify="center"
        h="100%"
      >
        <VStack spacing={4} align="center" textAlign={"center"}>
          <Box p={{ base: 1, md: 2 }}>
            <Heading
              fontWeight={700}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Say goodbye to dull emails. <br />
              <Text
                as={"span"}
                color={useColorModeValue("purple.300", "teal.300")}
              >
                AI
              </Text>
              {" takes care of boring emails, "}
              <br />
              <Text
                as={"span"}
                color={useColorModeValue("teal.300", "purple.300")}
              >
                you
              </Text>
              {" take the credit."}
            </Heading>
          </Box>
          <Stack
            color={useColorModeValue("gray.700", "gray.700")}
            spacing={8}
            direction={{ lg: "row", md: "column", sm: "column" }}
            w="auto"
          >
            <Box
              p={6}
              rounded="md"
              minW={400}
              w={{ lg: 400, md: "auto", sm: "auto" }}
              bg="white"
              color="black"
            >
              <Formik
                initialValues={initialValuesEmail}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(
                    values["typeOf"],
                    values["recipient"],
                    values["recipientName"],
                    values["subject"],
                    values["sender"],
                    values["extraInfo"],
                    values["date"],
                    values["funny"]
                  );
                  resetForm();
                }}
              >
                {({ handleSubmit, errors, values }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl isRequired>
                        <FormLabel htmlFor="typeOf">
                          Select the type of email
                        </FormLabel>
                        <SelectControl name="typeOf">
                          <option value="formal">Formal</option>
                          <option value="informal">Informal</option>
                          <option value="love letter">Love letter</option>
                        </SelectControl>
                        <FormErrorMessage>{errors.typeOf}</FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel htmlFor="recipient">
                          Who is the recipient?
                        </FormLabel>
                        <SelectControl name="recipient">
                          <option value="a boss">A boss</option>
                          <option value="a coworker">A coworker</option>
                          <option value="a friend">A Friend</option>
                          <option value="a lover">A lover</option>
                        </SelectControl>
                        <FormErrorMessage>{errors.recipient}</FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel htmlFor="recipientName">
                          What is their name?
                        </FormLabel>
                        <Field
                          as={Input}
                          placeholder="eg. Jon doe"
                          id="recipientName"
                          name="recipientName"
                          type="name"
                          variant="filled"
                          bg="gray.200"
                        />
                        <FormErrorMessage>
                          {errors.recipientName}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel htmlFor="subject">
                          What is the subject of this email?
                        </FormLabel>
                        <Field
                          as={Input}
                          placeholder="eg. my resignation"
                          id="subject"
                          name="subject"
                          type="name"
                          variant="filled"
                          bg="gray.200"
                        />
                        <FormErrorMessage>{errors.subject}</FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel htmlFor="sender">
                          And who sent this message?
                        </FormLabel>
                        <Field
                          as={Input}
                          id="sender"
                          placeholder="eg. Jane dou"
                          name="sender"
                          type="name"
                          variant="filled"
                          bg="gray.200"
                        />
                        <FormErrorMessage>{errors.subject}</FormErrorMessage>
                      </FormControl>
                      {values.typeOf !== "formal" && (
                        <>
                          {" "}
                          <FormControl>
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="funny"
                              id="funny"
                            >
                              Would you like to make it funny?
                            </Field>
                          </FormControl>{" "}
                        </>
                      )}
                      <Button type="submit" colorScheme="purple" width="full">
                        Generate email
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
            {!gratitude && (
              <Box
                bg="white"
                p={6}
                rounded="md"
                display="block"
                w="100%"
                maxW={1200}
                h="auto"
              >
                <Features />
              </Box>
            )}
            {gratitude && (
              <Box
                bg="white"
                p={6}
                rounded="md"
                display="block"
                maxW={1200}
                h="auto"
              >
                <Text fontWeight={700} fontSize="2xl" color={"purple.400"}>
                  {gratitude}
                </Text>
              </Box>
            )}
          </Stack>

          <Divider />
        </VStack>
      </Flex>
    </main>
  );
}
