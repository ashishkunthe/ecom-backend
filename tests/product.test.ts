import request from "supertest";
import app from "../src/index";

let adminToken = "";

beforeAll(async () => {
  const login = await request(app).post("/auth/admin-login").send({
    email: "admin@example.com",
    password: "admin123",
  });

  adminToken = login.body.token;
});

describe("Product Management Tests", () => {
  test("Admin can add a product", async () => {
    const res = await request(app)
      .post("/product/add-product")
      .set("Authorization", `${adminToken}`)
      .send({
        name: "Test Product",
        description: "A product for testing",
        price: 199,
        imageUrl: "http://example.com/test.jpg",
        inStock: true,
      });

    expect(res.body.product).toBeDefined();
    expect(res.body.message).toBe("product created sucessfully");
  });
});
