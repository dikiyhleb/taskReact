import * as React from "react";
import { DataGridPro, GridDataSource } from "@mui/x-data-grid-pro";
import { Paper, TextField, Toolbar, Typography } from "@mui/material";
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
  const [filter, setFilter] = React.useState<string | null>(null);
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
            filterItem?.field || "title",
            filterItem?.value || filter
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
    [baseService, auth?.authUser?.id, refresh, filter]
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

  function handleInputChange(value: string) {
    setFilter(value);
  }

  return (
    <div style={{ width: "95%" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Список заявок
        </Typography>
      </Toolbar>
      <TextField
        fullWidth
        id="filled-basic"
        label="Поиск по названию"
        variant="filled"
        sx={{
          marginBottom: "30px",
        }}
        onChange={(e) => handleInputChange(e.target.value)}
      />
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
    </div>
  );
}
