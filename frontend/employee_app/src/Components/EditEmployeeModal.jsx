import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, clearSelected } from "../Redux/EmployeeSlice";

function EditEmployeeModal({ open, onClose }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.employees.selected);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selected) {
      setFormData({
        name: selected.name || "",
        email: selected.email || "",
        position: selected.position || "",
      });
      setErrors({});
    }
  }, [selected]);

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
      newErrors.email = "Invalid email address";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error on field change
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(updateEmployee({ id: selected.id, data: formData }));
    dispatch(clearSelected());
    onClose();
  };

  const handleCancel = () => {
    dispatch(clearSelected());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            name="position"
            label="Position"
            fullWidth
            variant="outlined"
            value={formData.position}
            onChange={handleChange}
            error={!!errors.position}
            helperText={errors.position}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="warning" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEmployeeModal;
