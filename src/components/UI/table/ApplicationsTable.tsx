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
import { TableHead } from "@mui/material";

export default function ApplicationsTable() {
  const auth = React.useContext(AuthContext);
  const baseService = new BaseService();
  const [data, setData] = React.useState<ApplicationsPage>(
    new ApplicationsPage()
  );
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  React.useEffect(() => {
    if (auth?.authUser?.id) {
      baseService
        .getPageApplicationsByUserId(auth?.authUser?.id, page, limit)
        .then((res: ApplicationsPage) => {
          setData(res);
        });
    }
  }, [page, limit]);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Дата подачи</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">ID объекта</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((row) => (
            <TableRow key={row.title}>
              <TableCell sx={{ width: 100 }} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="left">
                {row.title}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.email}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.submission_date}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.status}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.building_id}
              </TableCell>
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
