const request = require("supertest");
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const createEmployeeRouter = require("../routes/employees");

jest.setTimeout(10000);

let app;
let db;

beforeAll(async () => {
  db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      position TEXT NOT NULL
    );
  `);

  app = express();
  app.use(express.json());

  app.use("/api/employees", createEmployeeRouter(db));
});

afterAll(async () => {
  await db.close();
});

describe("Employee API", () => {
  let createdEmployeeId;

  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        position: "Manager",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
    createdEmployeeId = res.body.id;
  });

  it("should fetch all employees", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch a single employee by id", async () => {
    const res = await request(app).get(`/api/employees/${createdEmployeeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdEmployeeId);
  });

  it("should update an employee", async () => {
    const res = await request(app)
      .put(`/api/employees/${createdEmployeeId}`)
      .send({
        name: "John Updated",
        email: "john.updated@gmail.com",
        position: "Staff",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("John Updated");
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete(`/api/employees/${createdEmployeeId}`);
    expect(res.statusCode).toBe(204);
  });

  it("should return 404 when deleting non-existing employee", async () => {
    const res = await request(app).delete(`/api/employees/9999`);
    expect(res.statusCode).toBe(404);
  });

  it("should return 400 on create when missing fields", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "", email: "", position: "" });
    expect(res.statusCode).toBe(400);
  });

  it("should return 404 when fetching non-existing employee", async () => {
    const res = await request(app).get("/api/employees/9999");
    expect(res.statusCode).toBe(404);
  });

  it("should return 400 on update when missing fields", async () => {
    const res = await request(app)
      .put(`/api/employees/${createdEmployeeId}`)
      .send({ name: "", email: "", position: "" });
    expect(res.statusCode).toBe(400);
  });
});
