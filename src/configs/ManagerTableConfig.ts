import { GridColDef } from "@mui/x-data-grid";

export const objectСolumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Название", width: 240 },
  { field: "address", headerName: "Адрес", width: 270 },
  {
    field: "registration_date",
    headerName: "Дата регистрации",
    type: "string",
    width: 170,
  },
  {
    field: "applications_count",
    headerName: "Кол-во заявок",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

export const applicationColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Название", width: 240 },
  { field: "email", headerName: "Email", width: 270 },
  {
    field: "submission_date",
    headerName: "Дата подачи",
    type: "string",
    width: 170,
  },
  {
    field: "status",
    headerName: "Статус",
    type: "string",
    width: 170,
  },
  {
    field: "building",
    headerName: "Объект",
    type: "string",
    width: 170,
  },
];
