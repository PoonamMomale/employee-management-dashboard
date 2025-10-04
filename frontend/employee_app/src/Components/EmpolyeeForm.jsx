import React, { useState } from "react";
import { addEmployee } from "../Redux/EmployeeSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Paper,
  Stack,
  Box,
} from "@mui/material";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(addEmployee(formData));
    setFormData({ name: "", email: "", position: "" });
  };

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          bgcolor: "#1e293b",
          borderRadius: 3,
          color: "#fff",
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              InputLabelProps={{ style: { color: "#bbb" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ style: { color: "#bbb" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              type="text"
              name="position"
              label="Position"
              variant="outlined"
              value={formData.position}
              onChange={handleChange}
              fullWidth
              error={!!errors.position}
              helperText={errors.position}
              InputLabelProps={{ style: { color: "#bbb" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  bgcolor: "#1976d2",
                  fontWeight: "bold",
                  ":hover": { bgcolor: "#1565c0" },
                }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default EmployeeForm;
