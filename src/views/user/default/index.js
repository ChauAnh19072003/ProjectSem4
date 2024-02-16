
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect } from "react";
import {
  MdAttachMoney,
  MdBarChart,
} from "react-icons/md";
import{
  TbPigMoney
}from "react-icons/tb"
import TotalSpent from "views/user/default/components/TotalSpent";
import BalanceCard from "views/user/default/components/RightContent"


export default function UserReports() {

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  useEffect(() => {
    const isEmailConfirmed = localStorage.getItem("is_enabled") === "true";
    console.log(isEmailConfirmed);
    if (isEmailConfirmed) {
      window.alert("Email confirmed. Login successful!");
      localStorage.removeItem("is_enabled");
    }
  }, []); 
  return (
    <Box display='flex' pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box w='700px'>
        <SimpleGrid
          columns={{ base: 1, md: 1, xl: 3}}
          gap='20px'
          mb='20px'>
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}  
                icon={
                  <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                }
              />
            }
            name='Income'
            value='$350.4'
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name='Expense'
            value='$642.39'
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={TbPigMoney} color={brandColor} />
                }
              />
            }
            name='Save'
            value='$100.39'
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <TotalSpent />
        </SimpleGrid>
      </Box>
      <Box w='50px'>
        <Divider orientation='vertical' margin='25px'/>
      </Box>
      <Box w = '400px'>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <BalanceCard/>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
