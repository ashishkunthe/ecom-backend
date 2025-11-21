import { PrismaClient } from "../generated/client";
import { Request, Response } from "express";

const client = new PrismaClient();

export async function getAdminStats(req: Request, res: Response) {
  try {
    // Total orders
    const orders = await client.order.findMany({
      include: { itemsSnapshots: true },
    });

    const totalOrders = orders.length;

    // Total revenue before any discounts
    const totalRevenueBefore = orders.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );

    // Total discount given
    const totalDiscountGiven = orders.reduce(
      (sum, o) => sum + (o.discountAmount || 0),
      0
    );

    // Total revenue after discount
    const totalRevenueAfter = orders.reduce((sum, o) => sum + o.finalAmount, 0);

    // Total items sold
    const totalItemsSold = orders.reduce((sum, o) => {
      return (
        sum + o.itemsSnapshots.reduce((itemSum, it) => itemSum + it.quantity, 0)
      );
    }, 0);

    // Discount codes
    const discounts = await client.discount.findMany();

    return res.json({
      message: "Admin stats fetched",
      totalOrders,
      totalRevenueBefore,
      totalRevenueAfter,
      totalDiscountGiven,
      totalItemsSold,
      discounts,
    });
  } catch (err) {
    console.log("Stats error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
