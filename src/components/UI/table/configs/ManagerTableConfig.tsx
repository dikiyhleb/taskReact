import { Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Status } from "../../../../models/Status.enum";

export const buildingCells: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Название", width: 350 },
  { field: "address", headerName: "Адрес", width: 350 },
  {
    field: "registration_date",
    headerName: "Дата регистрации",
    width: 200,
  },
  {
    field: "applications_count",
    headerName: "Кол-во заявок",
    width: 200,
  },
];

export const getApplicationManagerCells = (
  handleStatusChange: (applicationId: number, newStatus: string) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Название", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "submission_date",
    headerName: "Дата подачи",
    width: 200,
  },
  {
    field: "status",
    headerName: "Статус",
    width: 200,
    renderCell: (params) => (
      <Select
        value={params.value}
        onChange={(event) => {
          const newStatus = event.target.value;
          handleStatusChange(params.row.id, newStatus);
        }}
      >
        {Object.values(Status).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    ),
  },
  {
    field: "building_id",
    headerName: "ID объекта",
    width: 200,
  },
];

export const applicationUserCells: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Название", width: 250 },
  { field: "description", headerName: "Описание", width: 250 },
  {
    field: "submission_date",
    headerName: "Дата подачи",
    width: 200,
  },
  {
    field: "status",
    headerName: "Статус",
    width: 200,
  },
  {
    field: "building_id",
    headerName: "ID объекта",
    width: 200,
  },
];
