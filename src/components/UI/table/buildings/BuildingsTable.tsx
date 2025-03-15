import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "../TablePaginationActions";
import { BuildingsPage } from "../../../../DTOs/BuildingsPage";
import BaseService from "../../../../API/BaseService";
import { AuthContext } from "../../../../context/AuthContext";
import { TableHead, TableSortLabel } from "@mui/material";
import { buildingCells } from "../configs/ManagerTableConfig";
import { FilterSearchContext } from "../../../../context/InputRefContext";
import BuildingEntity from "../../../../models/BuildingEntity";
import MyBuildingDialog from "../../dialog/MyBuildingDialog";
import styles from "./Buildings.module.css";

type Order = "asc" | "desc";

export default function BuildingsTable() {
  const auth = React.useContext(AuthContext);
  const searchInput = React.useContext(FilterSearchContext);
  const baseService = new BaseService();
  const [data, setData] = React.useState<BuildingsPage>(new BuildingsPage());
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("ID");

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selBuilding, setSelBuilding] = React.useState<BuildingEntity | null>(
    null
  );

  React.useEffect(() => {
    if (auth?.authUser?.id) {
      baseService
        .getBuildings(
          auth?.authUser?.id,
          page,
          limit,
          order,
          orderBy,
          searchInput?.filter
        )
        .then((res: BuildingsPage) => {
          setData(res);
        });
    }
  }, [page, limit, order, orderBy, searchInput?.filter]);

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

  const handleOpenDialog = (obj: BuildingEntity) => {
    setOpenDialog(true);
    setSelBuilding(obj);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelBuilding(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {buildingCells.map((headCell) => (
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
            <TableRow
              className={styles.row}
              key={row.name}
              onClick={() => handleOpenDialog(row)}
            >
              <TableCell sx={{ width: 50 }} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.registration_date}</TableCell>
              <TableCell align="left">{row.applications_count}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell sx={{ columnSpan: 6 }} />
            </TableRow>
          )}
        </TableBody>
        <MyBuildingDialog
          open={openDialog}
          data={selBuilding}
          onClose={handleCloseDialog}
        />
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
