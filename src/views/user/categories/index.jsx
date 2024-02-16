
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/user/wallet/components/DevelopmentTable";
import CheckTable from "views/user/wallet/components/CheckTable";
import ColumnsTable from "views/user/wallet/components/ColumnsTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
} from "views/user/wallet/variables/columnsData";
import tableDataDevelopment from "views/user/wallet/variables/tableDataDevelopment.json";
import tableDataCheck from "views/user/wallet/variables/tableDataCheck.json";
import tableDataColumns from "views/user/wallet/variables/tableDataColumns.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </SimpleGrid>
    </Box>
  );
}
