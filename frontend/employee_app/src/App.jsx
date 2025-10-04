import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, clearSelected } from "./Redux/EmployeeSlice";
import EmployeeList from "./Components/EmployeeList";
import EditEmployeeModal from "./Components/EditEmployeeModal";

import { Box, Container, Typography, Paper, TextField } from "@mui/material";
import EmployeeForm from "./Components/EmpolyeeForm";

function App() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.employees.selected);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      setModalOpen(true);
    }
  }, [selected]);

  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(clearSelected());
  };

  return (
    <Box sx={{ bgcolor: "#0f172a", minHeight: "100vh", py: 5 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#fff", fontWeight: "bold" }}
        >
          Employee Management Dashboard
        </Typography>

        {/* Search bar full width */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1e293b",
            p: 2,
            borderRadius: 3,
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Search Employees"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputLabelProps={{ style: { color: "#cbd5e1" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
        </Paper>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 0.5 }}>
            <EmployeeForm />
          </Box>

          <Box sx={{ flex: 1 }}>
            <EmployeeList search={search} />
          </Box>
        </Box>
      </Container>

      <EditEmployeeModal open={modalOpen} onClose={handleModalClose} />
    </Box>
  );
}

export default App;
