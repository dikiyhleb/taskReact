import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
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

export const paginationModel = { page: 0, pageSize: 5 };
