import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { GrTransaction } from "react-icons/gr";
import { IoLogoUsd } from "react-icons/io5";
import { FaPiggyBank } from "react-icons/fa6";
import React from "react";

import { MdBarChart } from "react-icons/md";
import { column } from "stylis";

const TransactionHistory = (props) => {
  const brandColor = useColorModeValue("brand.500", "white");
  const { ...rest } = props;
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="30px">
        <Box textAlign="center">
          <Button
            bg={bgButton}
            _hover={{bgHover}}
            _focus={bgFocus}
            _active={bgFocus}
            w="45px"
            h="45px"
            lineHeight="100%"
            borderRadius="30px"
            {...rest}
          >
            <IconBox
              icon={
                <Icon w="30px" h="30px" as={GrTransaction} color={brandColor} />
              }
            />
          </Button>
          <Text
            color={textColor}
            fontSize="12px"
            textAlign="center"
            lineHeight="100%"
            mt="10px"
          >
            Transactions
          </Text>
        </Box>
        <Box textAlign="center">
          <Button
            bg={bgButton}
            _hover={{bgHover}}
            _focus={bgFocus}
            _active={bgFocus}
            w="45px"
            h="45px"
            lineHeight="100%"
            borderRadius="30px"
            {...rest}
          >
            <IconBox
              icon={
                <Icon w="30px" h="30px" as={IoLogoUsd} color='green' />
              }
            />
          </Button>
          <Text
            color={textColor}
            fontSize="12px"
            textAlign="center"
            lineHeight="100%"
            mt="10px"
          >
            Pay Bills
          </Text>
        </Box>
        <Box textAlign="center">
          <Button
            bg={bgButton}
            _hover={{bgHover}}
            _focus={bgFocus}
            _active={bgFocus}
            w="45px"
            h="45px"
            lineHeight="100%"
            borderRadius="30px"
            {...rest}
          >
            <IconBox
              icon={
                <Icon w="30px" h="30px" as={FaPiggyBank} color='red.400' />
              }
            />
          </Button>
          <Text
            color={textColor}
            fontSize="12px"
            textAlign="center"
            lineHeight="100%"
            mt="10px"
          >
            Save
          </Text>
        </Box>
      </Flex>

      <Text
        color={textColor}
        fontSize="20px"
        textAlign="start"
        fontWeight="700"
        lineHeight="100%"
        mb="20px"
      >
        Your transactions
      </Text>
    </Box>
  );
};

export default TransactionHistory;
