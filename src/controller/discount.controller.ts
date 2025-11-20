import { Request, Response } from "express";
import { PrismaClient } from "../generated/client";

const client = new PrismaClient();

interface RequestExtended extends Request {
  userId?: string;
}

export async function getActiveDiscounts(req: RequestExtended, res: Response) {
  const userId = req.userId;

  try {
    const discounts = await client.discount.findMany({
      where: {
        userId: Number(userId),
        isActive: true,
      },
    });

    if (discounts.length === 0) {
      return res.json({
        available: false,
        message: "No active discount codes",
      });
    }

    res.json({
      available: true,
      discounts,
    });
  } catch (error) {
    console.log("Error fetching discounts:", error);
    res.json({ message: "Something went wrong" });
  }
}
