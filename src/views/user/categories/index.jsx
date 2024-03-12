import React, { useEffect, useState } from "react";
import AuthService from "services/auth.service";
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
} from "@chakra-ui/react";
import { MdSettings, MdDelete } from "react-icons/md";
import CategoryStyles from "views/user/categories/Styles";
import Card from "components/card/Card";
import DeleteConfirmationAlert from "./deleteAlert";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [iconOptions, setIconOptions] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState([]);
  const [newCategoryType, setNewCategoryType] = useState("EXPENSE");
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

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
        console.log("Creating category with selected icon:", selectedIcon);
        const response = await axios.post("/api/categories/create", {
          name: newCategoryName,
          userId: currentUser.id,
          icon: selectedIcon,
          type: newCategoryType,
        });
        setCategories([...categories, response.data]);

        onClose();
      } catch (error) {
        console.error("Error creating category:", error);
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
  const handleUpdateCategory = async (categoryId) => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      try {
        console.log("Updating category with selected icon:", selectedIcon);
        const response = await axios.put(`/api/categories/${categoryId}`, {
          name: newCategoryName,
          userId: currentUser.id,
          icon: selectedIcon,
          type: newCategoryType,
        });
  
        // Update the categories array with the updated category
        const updatedCategories = categories.map((category) =>
          category.id === categoryId ? response.data : category
        );
  
        setCategories(updatedCategories);
        onClose();
      } catch (error) {
        console.error("Error updating category:", error);
      }
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
          <Flex justifyContent="flex-start" my="20px" direction={{ base: "column", md: "row" }}>
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
              onClick={onOpen}
              mx="20px"
            >
              Add
            </Box>
          </Flex>


          {/* CREATE */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
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
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* UPDATE */}
          <Modal isOpen={isOpen} onClose={onClose}>
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
                <Button onClick={onClose}>Cancel</Button>
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
                      <Flex align="center"
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
                          <Button className="setting" onClick={onOpen}>
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
