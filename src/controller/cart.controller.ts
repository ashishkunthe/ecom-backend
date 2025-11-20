import { Request, Response } from "express";
import { PrismaClient } from "../generated/client";

interface CustomRequest extends Request {
  userId?: string;
}

const client = new PrismaClient();

export async function addToCart(req: CustomRequest, res: Response) {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    if (!productId || !quantity) {
      return res.json({ message: "ProductId and quantity are required" });
    }

    let cart = await client.cart.findFirst({
      where: { userId: Number(userId) },
    });

    if (!cart) {
      cart = await client.cart.create({
        data: { userId: Number(userId) },
      });
    }

    const existingItem = await client.cartItem.findFirst({
      where: { productId, cartId: cart.id },
    });

    if (existingItem) {
      const updated = await client.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });

      return res.json({ message: "Quantity updated", item: updated });
    }

    const item = await client.cartItem.create({
      data: {
        productId,
        quantity,
        cartId: cart.id,
      },
    });

    return res.json({ message: "Added to cart", item });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
}

export async function getCart(req: CustomRequest, res: Response) {
  const userId = req.userId;

  try {
    const cart = await client.cart.findFirst({
      where: { userId: Number(userId) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({ message: "Success", cart });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
}

export async function removeFromCart(req: CustomRequest, res: Response) {
  const { itemId } = req.body;

  try {
    await client.cartItem.delete({
      where: { id: itemId },
    });

    res.json({ message: "Item removed" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
}

export async function updateCartQuantity(req: CustomRequest, res: Response) {
  const { itemId, quantity } = req.body;

  try {
    const updated = await client.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    res.json({ message: "Quantity updated", updated });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
}
