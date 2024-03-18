import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "services/auth/auth.service";
import Card from "components/card/Card";
import {
  Box,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Flex,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Icon,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slide,
} from "@chakra-ui/react";
function BillList() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        try {
          const response = await axios.get(
            `/api/bills/users/${currentUser.id}/bills`
          );
          setBills(response.data);
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      }
    };
    fetchBills();
  }, []);

  return (
    <>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                Bill Name
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                Amount
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                Start Date
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                Due Date
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {bills.map((bill) => (
            <Tr
              key={bill.id}
            >
              <Td    borderBottom="1px solid"
              borderColor='grey.700'>
                <Flex align="center">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {bill.billName}
                  </Text>
                </Flex>
              </Td>
              <Td    borderBottom="1px solid"
              borderColor='grey.700'>
                <Flex align="center">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {bill.amount}
                  </Text>
                </Flex>
              </Td>
              <Td    borderBottom="1px solid"
              borderColor='grey.700'>
                <Flex align="center">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {bill.recurrence.startDate}
                  </Text>
                </Flex>
              </Td>
              <Td    borderBottom="1px solid"
              borderColor='grey.700'>
                <Flex align="center">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {bill.dueDate}
                  </Text>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default BillList;
