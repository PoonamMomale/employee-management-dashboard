import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function createEmployeeRouter(db) {
  const router = express.Router();

  router.get("/", (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: ReasonPhrases.INTERNAL_SERVER_ERROR,
          message: err.message,
        });
      }
      res.status(StatusCodes.OK).json(rows);
    });
  });

  router.get("/:id", (req, res) => {
    db.get("SELECT * FROM employees WHERE id = ?", [req.params.id], (err, row) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
      }
      if (!row) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
      }
      res.status(StatusCodes.OK).json(row);
    });
  });

  router.post("/", (req, res) => {
    const { name, email, position } = req.body;
    if (!name || !email || !position) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }

    db.run(
      "INSERT INTO employees (name, email, position) VALUES (?, ?, ?)",
      [name, email, position],
      function (err) {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
        res.status(StatusCodes.CREATED).json({
          id: this.lastID,
          name,
          email,
          position,
        });
      }
    );
  });

  router.put("/:id", (req, res) => {
    const { name, email, position } = req.body;
    if (!name || !email || !position) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }

    db.run(
      "UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?",
      [name, email, position, req.params.id],
      function (err) {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
        }
        res.status(StatusCodes.OK).json({ id: req.params.id, name, email, position });
      }
    );
  });

  router.delete("/:id", (req, res) => {
    db.run("DELETE FROM employees WHERE id = ?", [req.params.id], function (err) {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
      if (this.changes === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
      }
      res.status(StatusCodes.NO_CONTENT).send();
    });
  });

  return router;
}
