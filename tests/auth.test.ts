import request from "supertest";
import app from "../src/index";

describe("Auth Tests", () => {
  test("User registration", async () => {
    const res = await request(app).post("/auth/user-register").send({
      email: "testuser@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(res.body.token).toBeDefined();
  });

  test("User login", async () => {
    const res = await request(app).post("/auth/user-login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.body.token).toBeDefined();
  });
});
