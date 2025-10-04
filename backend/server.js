import express from "express";
import cors from "cors";
import createEmployeeRouter from "./routes/employees.js";
import { StatusCodes } from "http-status-codes";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/employees', createEmployeeRouter(db));

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ message : 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});