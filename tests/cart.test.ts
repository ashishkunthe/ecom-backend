import request from "supertest";
import app from "../src/index";

let userToken = "";
let productId = "";

beforeAll(async () => {
  const login = await request(app).post("/auth/user-login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  userToken = login.body.token;
});

describe("Cart Tests", () => {
  test("User can get products and pick one", async () => {
    const res = await request(app)
      .post("/product/get-products")
      .set("Authorization", `${userToken}`);

    expect(res.body.products.length).toBeGreaterThan(0);
    productId = res.body.products[0].id;
  });

  test("User can add product to cart", async () => {
    const res = await request(app)
      .post("/cart/add")
      .set("Authorization", `${userToken}`)
      .send({
        productId,
        quantity: 1,
      });

    expect(res.body.message).toBe("product added to cart");
  });
});
