import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "services/auth/auth.service";
import {
  Text,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
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
  const [bills, setBills] = useState({
    overdueBills: [],
    dueIn3DaysBills: [],
    futureDueBills: [],
  });
  const [pageNumbers, setPageNumbers] = useState({
    overdueBills: 0,
    dueIn3DaysBills: 0,
    futureDueBills: 0,
  });
  const [totalPages, setTotalPages] = useState({
    overdueBills: 0,
    dueIn3DaysBills: 0,
    futureDueBills: 0,
  });
  // const [pageNumber, setPageNumber] = useState(0);
  const billsPerPage = 10;
  const [billName, setBillName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [billId, setBillId] = useState(null);
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
          const overdueResponse = await axios.get(
            `/api/bills/users/${currentUser.id}/bills?overduePage=${pageNumbers.overdueBills}&size=${billsPerPage}`
          );
          const dueIn3DaysResponse = await axios.get(
            `/api/bills/users/${currentUser.id}/bills?dueIn3DaysPage=${pageNumbers.dueIn3DaysBills}&size=${billsPerPage}`
          );
          const futureDueResponse = await axios.get(
            `/api/bills/users/${currentUser.id}/bills?futureDuePage=${pageNumbers.futureDueBills}&size=${billsPerPage}`
          );

          const overdueBills = overdueResponse.data.overdueBills;
          const dueIn3DaysBills = dueIn3DaysResponse.data.dueIn3DaysBills;
          const futureDueBills = futureDueResponse.data.futureDueBills;

          const overdueTotalPages = Math.ceil(
            overdueResponse.data.totalElements / billsPerPage
          );
          const dueIn3DaysTotalPages = Math.ceil(
            dueIn3DaysResponse.data.totalElements / billsPerPage
          );
          const futureDueTotalPages = Math.ceil(
            futureDueResponse.data.totalElements / billsPerPage
          );

          setTotalPages({
            overdueBills: overdueTotalPages,
            dueIn3DaysBills: dueIn3DaysTotalPages,
            futureDueBills: futureDueTotalPages,
          });
          setBills({ overdueBills, dueIn3DaysBills, futureDueBills });
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      }
    };
    fetchBills();
  }, [pageNumbers]);

  const handleSaveChanges = () => {
    onUpdateModalClose();
    // Call API to update bill
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
    setBillId(bill.billId);
    setBillName(bill.billName);
    setAmount(bill.amount);
    setDueDate(new Date(bill.dueDate));
    onUpdateModalOpen();
  };

  const handleUpdateBill = async () => {
    // Call API to update bill
    onUpdateModalClose();
  };

  const handlePageChange = async (newPageNumber, tab) => {
    setPageNumbers((prevState) => ({
      ...prevState,
      [tab]: newPageNumber,
    }));

    // Fetch new bills data for the updated page
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const response = await axios.get(
          `/api/bills/users/${currentUser.id}/bills?page=${newPageNumber}&size=${billsPerPage}`
        );

        const updatedBills = response.data;
        setBills((prevState) => ({
          ...prevState,
          [tab]: updatedBills,
        }));
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
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
      <Tabs colorScheme="teal">
        <TabList justifyContent="center">
          <Tab>Overdue</Tab>
          <Tab>Due in 3 Days</Tab>
          <Tab>Future Due</Tab>
        </TabList>
        <TabPanels>
          {Object.entries(bills).map(([tabTitle, tabData]) => (
            <TabPanel key={tabTitle}>
              <Flex direction="column">
                <Flex
                  fontWeight="bold"
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  py="2"
                  px="8"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  <Text flex="1">Id</Text>
                  <Text flex="2">Bill Name</Text>
                  <Text flex="1">Amount</Text>
                  <Text flex="2">Start Date</Text>
                  <Text flex="2">Due Date</Text>
                </Flex>

                {tabData &&
                  tabData.content &&
                  tabData.content.map((bill, index) => {
                    // Calculate startIndex for pagination
                    const startIndex = pageNumbers[tabTitle] * billsPerPage + 1;
                    // Calculate endIndex for pagination
                    const endIndex = Math.min(
                      (pageNumbers[tabTitle] + 1) * billsPerPage,
                      tabData.totalElements
                    );

                    return (
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
                          <Box
                            flex="1"
                            color="secondaryGray.900"
                            fontWeight="bold"
                          >
                            {index + startIndex}
                          </Box>
                          <Box
                            flex="2"
                            color="secondaryGray.900"
                            fontWeight="bold"
                          >
                            {bill.billName}
                          </Box>
                          <Box
                            flex="1"
                            color="secondaryGray.900"
                            fontWeight="bold"
                          >
                            {bill.amount}
                          </Box>
                          <Box
                            flex="2"
                            color="secondaryGray.900"
                            fontWeight="bold"
                          >
                            {bill.recurrence.startDate}
                          </Box>
                          <Box flex="2" color="secondary.900" fontWeight="bold">
                            {bill.dueDate}
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })}
              </Flex>
              <Flex justifyContent="center" mt={4}>
                <Button
                  onClick={() =>
                    handlePageChange(pageNumbers[tabTitle] - 1, tabTitle)
                  }
                  disabled={pageNumbers[tabTitle] === 0}
                  mr={2}
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    handlePageChange(pageNumbers[tabTitle] + 1, tabTitle)
                  }
                  disabled={pageNumbers[tabTitle] === totalPages[tabTitle] - 1}
                >
                  Next
                </Button>
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default BillList;
