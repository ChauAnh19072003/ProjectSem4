import React, { useEffect, useState } from "react";
import AuthService from "services/auth/auth.service";
import IconSelect from "./IconSelect";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import axios from "axios";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Table,
  Tbody,
  Td,
  Tr,
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
import { MdSettings, MdDelete } from "react-icons/md";
import CategoryStyles from "views/user/categories/Styles";
import Card from "components/card/Card";
import DeleteConfirmationAlert from "./deleteAlert";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
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
  const [iconOptions, setIconOptions] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState([]);
  const [newCategoryType, setNewCategoryType] = useState("EXPENSE");
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showErrors, setShowErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState(null);
  const fadeDuration = 4;
  useEffect(() => {
    const fetchCategories = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        try {
          const response = await axios.get(
            `/api/categories/user/${currentUser.id}`
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchIconOptions = async () => {
      try {
        const response = await axios.get("/api/categories/icons");
        setIconOptions(response.data);
        if (response.data.length > 0) {
          setSelectedIcon(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching icon options:", error);
      }
    };

    fetchIconOptions();
  }, []);
  const groupedCategories = categories.reduce((acc, category) => {
    const { type } = category;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(category);
    return acc;
  }, {});
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const handleCreateCategory = async () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      try {
        const response = await axios.post("/api/categories/create", {
          name: newCategoryName,
          userId: currentUser.id,
          icon: selectedIcon,
          type: newCategoryType,
        });
        setCategories([...categories, response.data]);
        setNewCategoryName("");
        setSelectedIcon("");
        setNewCategoryType("EXPENSE");
        onCreateModalClose();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "object"
        ) {
          setShowErrors(error.response.data);
          setShowErrorAlert(true);
        } else if (error.response && typeof error.response.data === "string") {
          const fieldErrors = error.response.data.split("\n");
          setShowErrors(fieldErrors);
          setShowErrorAlert(true);
        }
        setIsCollapseOpen(true);
        setTimeout(() => {
          setIsCollapseOpen(false);
        }, fadeDuration * 800);
      }
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryIdToDelete
      );
      setCategories(updatedCategories);
      setDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleOpenUpdateModal = (category) => {
    setNewCategoryName(category.name);
    setSelectedIcon(category.icon);
    setNewCategoryType(category.type);
    setCategoryIdToUpdate(category.id);
    onUpdateModalOpen();
  };
  const handleUpdateCategory = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        console.log("Updating category:", categoryIdToUpdate);
        console.log("New category name:", newCategoryName);
        console.log("Selected icon:", selectedIcon);
        console.log("New category type:", newCategoryType);
        console.log("Userid", currentUser.id);
        const response = await axios.put(
          `/api/categories/${categoryIdToUpdate}`,
          {
            id: categoryIdToUpdate,
            name: newCategoryName,
            userId: currentUser.id,
            icon: selectedIcon,
            type: newCategoryType,
          }
        );

        const updatedCategories = categories.map((cat) => {
          if (cat.id === categoryIdToUpdate) {
            return response.data;
          }
          return cat;
        });
        setCategories(updatedCategories);

        onUpdateModalClose();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error
    }
  };

  return (
    <CategoryStyles>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          direction="column"
          w="70%"
          px="150px"
          mx="auto"
          my="auto"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex
            justifyContent="flex-start"
            my="20px"
            direction={{ base: "column", md: "row" }}
          >
            <SearchBar w="70%" borderRadius="30px" />
            <Box
              as="button"
              borderRadius="30px"
              color="white"
              fontWeight="bold"
              w="20%"
              bgGradient="linear(to-r, #2b71ad, green.500)"
              _hover={{
                bgGradient: "linear(to-r, #2b71ad, #422AFB)",
              }}
              onClick={onCreateModalOpen}
              mx="20px"
            >
              Add
            </Box>
          </Flex>
          <Slide
            direction="top"
            in={isCollapseOpen}
            animateOpacity
            style={{ position: "fixed", zIndex: "9999" }}
          >
            {showErrorAlert && Object.keys(showErrors).length > 0 && (
              <Box p="40px" mt="4" w="30%" margin="auto" padding="auto">
                {Object.entries(showErrors).map(([field, errorMessage]) => (
                  <Alert key={field} status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                ))}
              </Box>
            )}
          </Slide>

          {/* CREATE */}
          <Modal isOpen={isCreateModalOpen} onClose={onCreateModalClose}>
            <ModalOverlay />
            <ModalContent marginTop="100px">
              <ModalHeader>Create New Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Flex alignItems="center" my="20px">
                  <IconSelect
                    value={selectedIcon}
                    onChange={(selectedOption) =>
                      setSelectedIcon(selectedOption)
                    }
                    options={iconOptions}
                  />
                  <Text fontSize="lg" mx="10px" marginRight="2">
                    Select Type:
                  </Text>
                  <Select
                    value={newCategoryType}
                    onChange={(e) => setNewCategoryType(e.target.value)}
                    w="30%"
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                    <option value="DEBT">Debt</option>
                  </Select>
                </Flex>
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleCreateCategory}
                >
                  Create
                </Button>
                <Button onClick={onCreateModalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* UPDATE */}
          <Modal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Flex alignItems="center" my="20px">
                  <IconSelect
                    value={selectedIcon}
                    onChange={(selectedOption) =>
                      setSelectedIcon(selectedOption)
                    }
                    options={iconOptions}
                  />
                  <Text fontSize="lg" mx="10px" marginRight="2">
                    Select Type:
                  </Text>
                  <Select
                    value={newCategoryType}
                    onChange={(e) => setNewCategoryType(e.target.value)}
                    w="30%"
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                    <option value="DEBT">Debt</option>
                  </Select>
                </Flex>
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleUpdateCategory}
                >
                  Update
                </Button>
                <Button onClick={onUpdateModalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {Object.keys(groupedCategories).map((type) => (
            <div key={type}>
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                display="flex"
                alignItems="flex-start"
              >
                {type === "EXPENSE"
                  ? "Expense"
                  : type === "DEBT"
                  ? "Debt"
                  : "Income"}{" "}
                categories
              </Text>
              <Table variant="simple" color="gray.500" mb="24px">
                {groupedCategories[type].map((category) => (
                  <Tbody key={category.id}>
                    <Tr>
                      <Flex
                        align="center"
                        direction={{ base: "column", md: "row" }}
                      >
                        <Text color={textColor} display="flex" my="10px">
                          {category.icon && category.icon.path && (
                            <img
                              src={`/assets/img/icons/${category.icon.path}`}
                              alt={category.name + " Icon"}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <p>{category.name}</p>
                        </Text>
                      </Flex>
                      <Td>
                        <Flex justifyContent="space-evenly" alignItems="center">
                          <Button
                            className="setting"
                            onClick={() => handleOpenUpdateModal(category)}
                          >
                            <span>
                              <Icon
                                as={MdSettings}
                                w="20px"
                                h="20px"
                                color={textColor}
                              />
                            </span>
                          </Button>
                          <Button
                            className="delete"
                            onClick={() => {
                              setCategoryIdToDelete(category.id);
                              setDeleteAlertOpen(true);
                            }}
                          >
                            <span className="deleteIcon">
                              <Icon
                                as={MdDelete}
                                w="20px"
                                h="20px"
                                color={textColor}
                              />
                            </span>
                          </Button>
                          <DeleteConfirmationAlert
                            isOpen={isDeleteAlertOpen}
                            onClose={() => setDeleteAlertOpen(false)}
                            onConfirm={() => {
                              if (categoryIdToDelete) {
                                handleDeleteCategory(categoryIdToDelete);
                              }
                              setDeleteAlertOpen(false);
                            }}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </div>
          ))}
        </Card>
      </Box>
    </CategoryStyles>
  );
};

export default CategoryList;
