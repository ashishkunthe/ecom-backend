import request from "supertest";
import app from "../src/index";

describe("Admin Auth Tests", () => {
  test("Admin login should return a token", async () => {
    const res = await request(app).post("/auth/admin-login").send({
      email: "admin@example.com",
      password: "admin123",
    });

    expect(res.body.token).toBeDefined();
  });
});
