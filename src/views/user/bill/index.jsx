import { Box } from "@chakra-ui/react";
import Card from "components/card/Card";
import ColumnsTable from "views/user/bill/components/ColumnsTable";
import React from "react";
export default function Bills() {
  // Chakra Color Mode
  return (
    <Box
      pt={{ base: "130px", md: "80px", xl: "80px" }}
    >
      <Card
        direction="column"
        w="70%"
        mx="auto"
        my="auto"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <ColumnsTable />
      </Card>
    </Box>
  );
}
