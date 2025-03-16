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
  },
  {
    field: "building",
    headerName: "ID объекта",
    width: 200,
  },
];
