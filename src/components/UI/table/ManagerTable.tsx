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
import { BuildingsPage } from "../../../DTOs/BuildingsPage";
import BaseService from "../../../API/BaseService";
import { AuthContext } from "../../../context/AuthContext";

export default function ManagerTable() {
  const auth = React.useContext(AuthContext);
  const baseService = new BaseService();
  const [data, setData] = React.useState<BuildingsPage>(new BuildingsPage());
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  React.useEffect(() => {
    if (auth?.authUser?.id) {
      baseService
        .getPageBuildingsByUserId(auth?.authUser?.id, page + 1, limit)
        .then((res: BuildingsPage) => {
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
        <TableBody>
          {data.items.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ width: 100 }} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="left">
                {row.name}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.address}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.registration_date}
              </TableCell>
              <TableCell sx={{ width: 160 }} align="center">
                {row.applications_count}
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
              colSpan={5}
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
