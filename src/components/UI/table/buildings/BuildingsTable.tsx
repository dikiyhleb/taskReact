import * as React from "react";
import Paper from "@mui/material/Paper";
import { BuildingsPage } from "../../../../DTOs/BuildingsPage";
import BaseService from "../../../../API/BaseService";
import { AuthContext } from "../../../../context/AuthContext";
import { DataGridPro, GridDataSource } from "@mui/x-data-grid-pro";
import { buildingCells } from "../configs/ManagerTableConfig";

export default function BuildingsTable() {
  const auth = React.useContext(AuthContext);
  const baseService = new BaseService();

  const dataSource: GridDataSource = React.useMemo(
    () => ({
      getRows: async (params) => {
        if (auth?.authUser?.id) {
          try {
            const sortItem = params.sortModel?.[0];
            const filterItem = params.filterModel?.items?.[0];

            const response: BuildingsPage = await baseService.getBuildings(
              auth?.authUser?.id,
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
          } catch (error) {
            console.log("Buildings load error", error);
          }
        }
        return { rows: [], rowCount: 0 };
      },
    }),
    [auth?.authUser?.id, baseService]
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

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGridPro
        columns={buildingCells}
        unstable_dataSource={dataSource}
        pagination
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        initialState={initialStateWithPagination}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
}
