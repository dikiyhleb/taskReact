import { HeadCell } from "./MyTableCell";

export const buildingCells: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "name", label: "Название" },
  { id: "address", label: "Адрес" },
  {
    id: "registration_date",
    label: "Дата регистрации",
  },
  {
    id: "applications_count",
    label: "Кол-во заявок",
  },
];

export const applicationCells: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "title", label: "Название" },
  { id: "email", label: "Email" },
  {
    id: "submission_date",
    label: "Дата подачи",
  },
  {
    id: "status",
    label: "Статус",
  },
  {
    id: "building",
    label: "ID объекта",
  },
];
