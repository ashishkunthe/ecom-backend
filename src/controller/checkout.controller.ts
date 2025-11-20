import { Request, Response } from "express";
import { PrismaClient } from "../generated/client";

const client = new PrismaClient();

interface RequestExtended extends Request {
  userId?: string;
}

export async function checkoutController(req: RequestExtended, res: Response) {
  const { cartId, discountCode } = req.body;
  const userId = req.userId;

  try {
    if (!cartId) {
      return res.json({ message: "cart id is missing" });
    }

    //  Fetch Cart with product details
    const cart = await client.cart.findFirst({
      where: { id: cartId, userId: Number(userId) },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return res.json({ message: "cart not found" });
    }

    if (cart.items.length === 0) {
      return res.json({ message: "your cart is empty" });
    }

    let total = 0;

    for (let item of cart.items) {
      total += item.product.price * item.quantity;
    }

    //  Validate discount code
    let discountAmount = 0;
    let finalAmount = total;
    let discountApplied = false;

    if (discountCode) {
      const discount = await client.discount.findFirst({
        where: {
          discountCode,
          isActive: true,
          userId: Number(userId),
        },
      });

      if (!discount) {
        return res.json({ message: "Invalid or expired discount code" });
      }

      // Apply 10% discount
      discountAmount = total * 0.1;
      finalAmount = total - discountAmount;
      discountApplied = true;

      await client.discount.update({
        where: { id: discount.id },
        data: { isActive: false },
      });
    }

    //  Create order
    const order = await client.order.create({
      data: {
        userId: Number(userId),
        totalAmount: total,
        finalAmount: finalAmount,
        discountAmount: discountAmount,
        discountApplied: discountApplied ? 1 : 0,
      },
    });

    //  Snapshot order items
    for (let item of cart.items) {
      await client.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.product.price,
        },
      });
    }

    // Clear cart
    await client.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    //  Nth Order Discount Logic
    const totalOrders = await client.order.count();
    const N = Number(process.env.NTH_ORDER) || 5;

    if (totalOrders % N == 0) {
      const generatedCode =
        "DISC-" + Math.random().toString(36).substring(2, 10).toUpperCase();

      await client.discount.create({
        data: {
          discountCode: generatedCode,
          isActive: true,
          userId: Number(userId),
        },
      });
    }

    res.json({
      message: "Checkout successful",
      orderId: order.id,
      totalAmount: total,
      finalAmount,
      discountApplied,
      discountAmount,
    });
  } catch (error) {
    console.log("Checkout error:", error);
    res.json({ message: "Something went wrong" });
  }
}
