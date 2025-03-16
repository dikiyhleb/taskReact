import { GridColDef } from "@mui/x-data-grid";

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

export const applicationCells: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Название" },
  { field: "email", headerName: "Email" },
  {
    field: "submission_date",
    headerName: "Дата подачи",
  },
  {
    field: "status",
    headerName: "Статус",
  },
  {
    field: "building",
    headerName: "ID объекта",
  },
];
