import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import BuildingEntity from "../../models/BuildingEntity";
import BaseService from "../../API/BaseService";
import { AuthContext } from "../../context/AuthContext";
import {
  applicationColumns,
  objectСolumns,
} from "../../configs/ManagerTableConfig";
import { ApplicationEntity } from "../../models/ApplicationEntity";

const paginationModel = { page: 0, pageSize: 5 };

interface ActivePageType {
  activePage: string;
}

//TODO почему вызывается useEffect два раза при обновлении страницы?
//TODO переделать activePage
export default function ManagerTable({ activePage }: ActivePageType) {
  const baseService = new BaseService();
  const auth = React.useContext(AuthContext);
  const [applications, setApplications] = React.useState<
    ApplicationEntity[] | []
  >([]);
  const [buildings, setBuildings] = React.useState<BuildingEntity[] | []>([]);

  React.useEffect(() => {
    initTable();
  }, []);

  function initTable() {
    if (auth?.authUser?.id) {
      baseService
        .getAllBuildingsByUserId(auth?.authUser?.id)
        .then((res: BuildingEntity[]) => {
          console.log("getDataForTable(): get buildings...");
          console.log(res);

          const resApp: ApplicationEntity[] = [];

          res.forEach((b) => b.applications.forEach((a) => resApp.push(a)));
          setApplications(resApp);

          setBuildings(res);
        });
    }
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={activePage == "Объекты" ? buildings : applications}
        columns={activePage == "Объекты" ? objectСolumns : applicationColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
