import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "services/auth/auth.service";
import {
  Text,
  useColorModeValue,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Input,
} from "@chakra-ui/react";
function BillList() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [bills, setBills] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
  const billsPerPage = 10;
  const [billName, setBillName] = useState("");
  const [amount, setAmount] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [billId, setBillId] = useState(null);
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchBills = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        try {
          const response = await axios.get(
            `/api/bills/users/${currentUser.id}/bills?page=${pageNumber}&size=${billsPerPage}`
          );
          setBills(response.data.content);
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      }
    };
    fetchBills();
  }, [pageNumber]);

  const handleSaveChanges = () => {
    onUpdateModalClose();
  };
  const getRowColor = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);

    const differenceInDays = Math.ceil(
      (dueDateObj - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays <= 0) {
      return "red.200";
    } else if (differenceInDays <= 3) {
      return "yellow.200";
    } else {
      return "green.100";
    }
  };

  const handleOpenUpdateModal = (bill) => {
    setBillName(bill.billName);
    setAmount(bill.amount);
    setDueDate(bill.dueDate);
    setBillId(bill.billId);
    onUpdateModalOpen();
  };

  const handleUpdateBill = async () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      try {
        const response = await axios.put(`api/bills/${billId}`, {
          id: billId,
          name: billName,
          amount: amount,
          dueDate: dueDate,
        });
      } catch (error) {}
    }
  };

  return (
    <>
      <Modal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bill Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Text mb={2}>Bill Name:</Text>
              <Input
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
              />
            </Box>
            <Box mb={4}>
              <Text mb={2}>Amount:</Text>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>
            <Box mb={4}>
              <Text mb={2}>Due Date:</Text>
              <Input
                value={
                  dueDate instanceof Date
                    ? dueDate.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => setDueDate(new Date(e.target.value))}
                size="md"
                type="date"
              />
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button onClick={onUpdateModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction="column">
        <Flex
          fontWeight="bold"
          borderBottomWidth="1px"
          borderColor={borderColor}
          py="2"
          px="4"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          <Text flex="1">Id</Text>
          <Text flex="2">Bill Name</Text>
          <Text flex="1">Amount</Text>
          <Text flex="2">Start Date</Text>
          <Text flex="2">Due Date</Text>
        </Flex>
        {bills.map((bill) => (
          <Box
            key={bill.billId}
            alignItems="center"
            onClick={() => handleOpenUpdateModal(bill)}
            cursor="pointer"
            position="relative"
            borderRadius={8}
            background={getRowColor(bill.dueDate)}
            mb={1}
            py="2"
            px="4"
            fontSize="sm"
            _hover={{
              boxShadow:
                "20px 20px 20px -20px rgba(0, 0, 0, 0.4), -20px -20px 20px -20px rgba(0, 0, 0, 0.1), 0 0 20px -20px rgba(0, 0, 0, 0.1), 20px 0 20px -20px rgba(0, 0, 0, 0.5), 0 20px 20px -20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Flex key={bill.billId} py="2" px="4">
              <Box flex="1" color={textColor} fontWeight="bold">
                {bill.billId}
              </Box>
              <Box flex="2" color={textColor} fontWeight="bold">
                {bill.billName}
              </Box>
              <Box flex="1" color={textColor} fontWeight="bold">
                {bill.amount}
              </Box>
              <Box flex="2" color={textColor} fontWeight="bold">
                {bill.recurrence.startDate}
              </Box>
              <Box flex="2" color={textColor} fontWeight="bold">
                {bill.dueDate}
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  );
}

export default BillList;
