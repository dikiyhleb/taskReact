import { MyTableCell } from "../components/UI/table/MyTableCell";

export const objectСolumns: MyTableCell[] = [
  { name: "id", width: 70 },
  { name: "name", width: 240 },
  { name: "address", width: 270 },
  {
    name: "registration_date",
    width: 170,
  },
  {
    name: "applications_count",
    width: 160,
  },
];

export const applicationColumns: MyTableCell[] = [
  { name: "id", width: 70 },
  { name: "title", width: 240 },
  { name: "email", width: 270 },
  {
    name: "submission_date",
    width: 170,
  },
  {
    name: "status",
    width: 170,
  },
  {
    name: "building",
    width: 170,
  },
];
