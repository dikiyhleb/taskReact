import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
import BaseService from "../../../API/BaseService";
import { AuthContext } from "../../../context/AuthContext";
import { ApplicationsPage } from "../../../DTOs/ApplicationsPage";
import { TableHead, TableSortLabel } from "@mui/material";
import { applicationCells } from "./configs/ManagerTableConfig";

type Order = "asc" | "desc";

export default function ApplicationsTable() {
  const auth = React.useContext(AuthContext);
  const baseService = new BaseService();
  const [data, setData] = React.useState<ApplicationsPage>(
    new ApplicationsPage()
  );
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("ID");

  React.useEffect(() => {
    if (auth?.authUser?.id) {
      baseService
        .getPageApplicationsWithSortByUserId(
          auth?.authUser?.id,
          page,
          limit,
          order,
          orderBy
        )
        .then((res: ApplicationsPage) => {
          setData(res);
        });
    }
  }, [page, limit, order, orderBy]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * limit - data.meta?.total_items) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {applicationCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((row) => (
            <TableRow key={row.title}>
              <TableCell sx={{ width: 50 }} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.submission_date}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.building_id}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell sx={{ columnSpan: 6 }} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={data.meta?.total_items}
              rowsPerPage={limit}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeLimit}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
