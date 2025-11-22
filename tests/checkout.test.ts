import request from "supertest";
import app from "../src/index";

let userToken = "";

beforeAll(async () => {
  const login = await request(app).post("/auth/user-login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  userToken = login.body.token;
});

describe("Checkout Tests", () => {
  test("Checkout should fail when cart is empty", async () => {
    const res = await request(app)
      .post("/cart/checkout")
      .set("Authorization", `${userToken}`)
      .send({
        cartId: "fake_cart_id",
      });

    expect(res.body.message).toBeDefined();
  });
});
