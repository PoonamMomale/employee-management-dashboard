import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../Redux/EmployeeSlice.js';

export const store = configureStore({
    reducer: {
        employees: employeeReducer
    }
});