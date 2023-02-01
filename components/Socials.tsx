import {
  Heading,
  Box,
  Flex,
  useColorModeValue,
  chakra,
  Icon,
  Link,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

const socials = [
  {
    header: "You found this helpful?",
    content:
      "I'm thrilled that you stumbled upon my website and found the email wizard useful! If you'd like to help keep this domain alive and support me in my website building endeavors, why not buy me a coffee? Your support will help me continue to create awesome tools and improve this website. Let's keep the good vibes and great email writing flowing!",
    avatar: "https://i.imgur.com/D9qoKhj.png",
    alt: "buy me a coffe logo",
    shadow: "none",
    borderRadius: "none",
    url: "https://www.buymeacoffee.com/balogalin",
    key: 1,
  },
  {
    header: "You think we could work togheter?",
    content:
      "Are you ready to unleash your full web potential? Then it's time to partner with the fantastic team at upCrafty that's always ready to help businesses develop web solutions and build their brands. So, if you're looking for some top-notch web development and design help, why not reach out to us? Let's make some magic happen!",
    avatar: "https://i.imgur.com/ycifPxp.png",
    alt: "upCrafty logo",
    shadow: "base",
    borderRadius: "full",
    url: "#/",
    key: 0,
  },
];

interface SocialProps {
  header: string;
  content: string;
  avatar: string;
  alt: string;
  shadow: string;
  borderRadius: string;
  url: string;
  key: number;
}

function SocialCard(props: SocialProps) {
  const { content, avatar, header, alt, shadow, borderRadius, url, key } =
    props;
  return (
    <Link href={url} isExternal>
      <Flex
        boxShadow={"lg"}
        maxW={"640px"}
        direction={{ base: "column-reverse" }}
        width={"full"}
        rounded={"xl"}
        p={4}
        justifyContent={"space-between"}
        position={"relative"}
        bg={"gray.50"}
        color={useColorModeValue("gray.700", "gray.700")}
      >
        <Flex
          direction={"column"}
          textAlign={"left"}
          justifyContent={"space-between"}
        >
          <Heading py={5}>{header}</Heading>
          <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4}>
            {content}
          </chakra.p>
        </Flex>
        <Image
          src={avatar}
          alt={alt}
          alignSelf={"center"}
          boxShadow={shadow}
          borderRadius={borderRadius}
        />
      </Flex>
    </Link>
  );
}

export default function Socials() {
  return (
    <Flex
      textAlign={"center"}
      pt={10}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={"20"} mx={"auto"}>
        {socials.map((cardInfo, key) => (
          <SocialCard {...cardInfo} key={key} />
        ))}
      </SimpleGrid>
      <Box>
        <Icon
          viewBox="0 0 40 35"
          mt={14}
          boxSize={10}
          color={useColorModeValue("purple.300", "teal.300")}
        >
          <path
            fill={"currentColor"}
            d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
          />
        </Icon>
      </Box>
    </Flex>
  );
}
