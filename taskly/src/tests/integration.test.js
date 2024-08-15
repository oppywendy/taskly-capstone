const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

let token;
let userId;
let organizationId;
let boardId;
let taskId;

beforeAll(async () => {
  // Connect to the database before running tests
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  // Clean up the database by deleting all documents from the collections
  await mongoose.connection.db.dropDatabase();
  // Close the database connection
  await mongoose.connection.close();
});

describe("User and Board and Task Management", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser1@example.com",
      password: "password",
      name: "Test User"
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should login the user and get a token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser1@example.com",
      password: "password"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // Store token for subsequent requests
  });

  it("should create an organization", async () => {
    const res = await request(app)
      .post("/api/organizations")
      .send({ name: "Test Organization", description: "Test description" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Test Organization");
    organizationId = res.body._id; // Store organization ID
  });

  it("should create a board", async () => {
    const res = await request(app)
      .post(`/api/organizations/${organizationId}/boards`)
      .send({
        name: "Test Board",
        description: "Test description",
        organizationId
      })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty("name", "Test Board");
    boardId = res.body.data._id; // Store board ID
  });

  it("should create a task", async () => {
    const res = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .send({
        title: "Test Task",
        description: "Test description",
        dueDate: "2024-12-31"
      })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty("title", "Test Task");
    taskId = res.body.data._id; // Store task ID
  });

  it("should get all tasks for a board", async () => {
    const res = await request(app)
      .get(`/api/boards/${boardId}/tasks`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0); // Ensure there is at least one task
  });

  it("should add a comment to a task", async () => {
    const res = await request(app)
      .post(`/api/tasks/${taskId}/comments`)
      .send({ text: "This is a comment" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.comments).toBeInstanceOf(Array);
    expect(res.body.data.comments.length).toBeGreaterThan(0); // Ensure comment was added
  });

  it("should upload an attachment to a task", async () => {
    const res = await request(app)
      .post(`/api/tasks/${taskId}/attachments`)
      .send({ url: "http://example.com/file.pdf", fileType: "application/pdf" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.attachments).toBeInstanceOf(Array);
    expect(res.body.data.attachments.length).toBeGreaterThan(0); // Ensure attachment was added
  });
});
