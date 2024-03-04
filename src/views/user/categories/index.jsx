import React, { useEffect, useState } from "react";
import AuthService from "services/auth.service";
import axios from "axios";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Card from "components/card/Card";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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

  const groupedCategories = categories.reduce((acc, category) => {
    const { type } = category;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(category);
    return acc;
  }, {});
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card
        direction="column"
        w="70%"
        px="150px"
        mx="auto"
        my="auto"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
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
              {type === "EXPENSE" ? "Expense" : "Income"} categories
            </Text>
            {/* <ul>
              {groupedCategories[type].map((category) => (
                <li key={category.id} style={{ listStyle: "none" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {category.icon && category.icon.path && (
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/icons/" +
                          category.icon.path
                        }
                        alt={category.name + " Icon"}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    <p>{category.name}</p>
                  </div>
                </li>
              ))}
            </ul> */}
            <Table variant="simple" color="gray.500" mb="24px">
              {groupedCategories[type].map((category) => (
                <Tbody>
                  <Tr key={category.id}>
                    <Flex align="center">
                      <Text color={textColor} display='flex' my='10px'>
                        {category.icon && category.icon.path && (
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/icons/" +
                              category.icon.path
                            }
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
                    <Td>Delete | Update</Td>
                  </Tr>
                  
                </Tbody>
              ))}
            </Table>
          </div>
        ))}
      </Card>
    </Box>
  );
};

export default CategoryList;
