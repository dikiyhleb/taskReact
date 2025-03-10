import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { columns, paginationModel } from "../../configs/ManagerTableConfig";
import BuildingEntity from "../../models/BuildingEntity";
import BaseService from "../../API/BaseService";
import { AuthContext } from "../../context/AuthContext";

export default function ManagerTable() {
  const baseService = new BaseService();
  const auth = React.useContext(AuthContext);
  const [dataTable, setDataTable] = React.useState<BuildingEntity[] | []>([]);

  React.useEffect(() => {
    const userId = auth?.authUser?.id;
    if (userId) {
      baseService
        .getAllBuildingByUserId(userId)
        .then((res: BuildingEntity[]) => {
          setDataTable(res);
        });
    }
  }, []);

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={dataTable}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
