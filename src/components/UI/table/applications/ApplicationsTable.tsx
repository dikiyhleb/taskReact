import * as React from "react";
import { DataGridPro, GridDataSource } from "@mui/x-data-grid-pro";
import { Paper } from "@mui/material";
import BaseService from "../../../../API/BaseService";

import { AuthContext } from "../../../../context/AuthContext";
import { ApplicationsPage } from "../../../../DTOs/ApplicationsPage";
import {
  getApplicationManagerCells,
  applicationUserCells,
} from "../configs/ManagerTableConfig";

export default function ApplicationsTable() {
  const auth = React.useContext(AuthContext);
  const baseService = new BaseService();
  const [refresh, setRefresh] = React.useState(0);

  const dataSource: GridDataSource = React.useMemo(
    () => ({
      getRows: async (params) => {
        if (auth?.authUser?.id) {
          const sortItem = params.sortModel?.[0];
          const filterItem = params.filterModel?.items?.[0];

          const response: ApplicationsPage = await baseService.getApplications(
            auth?.authUser,
            params.paginationModel.page,
            params.paginationModel.pageSize,
            sortItem?.sort,
            sortItem?.field,
            filterItem?.field,
            filterItem?.value
          );

          return {
            rows: response.items,
            rowCount: response.meta.total_items,
          };
        }
        return {
          rows: [],
          rowCount: 0,
        };
      },
    }),
    [baseService, auth?.authUser?.id, refresh]
  );

  const initialStateWithPagination = React.useMemo(
    () => ({
      pagination: {
        paginationModel: { pageSize: 5, page: 0 },
        rowCount: 0,
      },
    }),
    []
  );

  const handleStatusChange = async (appId: number, newStatus: string) => {
    try {
      await baseService.setStatusApp(appId, newStatus).then((res) => {
        console.log(res);
        setRefresh((prev) => prev + 1);
      });
    } catch (error) {
      console.error("setStatusApp:", error);
    }
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGridPro
        columns={
          auth?.authUser?.role == "MANAGER"
            ? getApplicationManagerCells(handleStatusChange)
            : applicationUserCells
        }
        unstable_dataSource={dataSource}
        pagination
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        initialState={initialStateWithPagination}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
    </Paper>
  );
}
