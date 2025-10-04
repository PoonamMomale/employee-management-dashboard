import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, setSelected } from "../Redux/EmployeeSlice";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Typography,
  TablePagination,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeList({ search }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Clamp page to max valid page when filtered list or rowsPerPage changes
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [filtered, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getPositionChipColor = (position) => {
    switch (position.toLowerCase()) {
      case "manager":
        return "success";
      case "staff":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: "#1e293b", borderRadius: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#fff", fontWeight: 600, textAlign: "center", paddingBottom: "10px" }}
      >
        Employee List
      </Typography>

      <Table size="small" sx={{ color: "#fff" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Name</TableCell>
            <TableCell sx={{ color: "#fff" }}>Email</TableCell>
            <TableCell sx={{ color: "#fff" }}>Position</TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.length ? (
            paginated.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell sx={{ color: "#e2e8f0" }}>{emp.name}</TableCell>
                <TableCell sx={{ color: "#e2e8f0" }}>{emp.email}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.position}
                    color={getPositionChipColor(emp.position)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => dispatch(setSelected(emp))}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteEmployee(emp.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ color: "#cbd5e1" }}>
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filtered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#fff",
          borderTop: "1px solid #334155",
        }}
      />
    </Paper>
  );
}

export default EmployeeList;
