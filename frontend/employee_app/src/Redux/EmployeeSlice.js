import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:4000/api/employees";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    const res = await fetch(API);
    return res.json();
  }
);

export const addEmployee = createAsyncThunk("/employees/add", async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
});

export const updateEmployee = createAsyncThunk(
  "/employees/update",
  async ({ id, data }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employees/delete",
  async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
    selected: null,
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (e) => e.id === parseInt(action.payload.id)
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e.id !== action.payload);
      });
  },
});

export const { setSelected, clearSelected } = employeeSlice.actions;
export default employeeSlice.reducer;
