
import { Box } from "@chakra-ui/react";
import Card from "components/card/Card";
import ColumnsTable from "views/user/bill/components/ColumnsTable";
import {
  columnsDataColumns,
} from "views/user/bill/variables/columnsData";
import tableDataColumns from "views/user/bill/variables/tableDataColumns.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card direction="column"
        w="70%"
        px="150px"
        mx="auto"
        my="auto"
        overflowX={{ sm: "scroll", lg: "hidden" }}>
    
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </Card>
    </Box>
  );
}
