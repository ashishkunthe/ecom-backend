import { Request, Response } from "express";
import { PrismaClient } from "../generated/client";

interface RequestExtended extends Request {
  userId: string;
}

const client = new PrismaClient();

export async function addProduct(req: RequestExtended, res: Response) {
  const { name, description, price, imageUrl, inStock } = req.body;

  try {
    if (!name || !description || !price) {
      return res.json({
        message: "all fields are required",
      });
    }

    const product = await client.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        inStock,
      },
    });

    res.json({
      message: "product created sucessfully",
      product: product,
    });
  } catch (error) {
    console.log("failed to create product at this time", error);
    res.json({
      messgae: "something went wrong: try again",
    });
  }
}

export async function updateProduct(req: RequestExtended, res: Response) {
  const { name, description, price, imageUrl, inStock } = req.body;
  const { id } = req.params;

  try {
    if (!name || !description || !price) {
      return res.json({
        message: "all fields are required",
      });
    }

    if (!id) {
      res.json({
        message: "id is missing",
      });
    }
    const findProduct = await client.product.findFirst({ where: { id: id } });

    if (!findProduct) {
      return res.json({
        message: "the product not found",
      });
    }

    const product = await client.product.update({
      where: { id: id },
      data: {
        description,
        imageUrl,
        inStock,
        name,
        price,
      },
    });

    res.json({
      message: "product updated sucessfully",
      product: product,
    });
  } catch (error) {
    console.log("failed to create product at this time", error);
    res.json({
      messgae: "something went wrong: try again",
    });
  }
}

export async function deleteProduct(req: RequestExtended, res: Response) {
  const { id } = req.params;

  try {
    if (!id) {
      res.json({
        message: "id is missing",
      });
    }

    const findProduct = await client.product.findFirst({ where: { id: id } });

    if (!findProduct) {
      return res.json({
        message: "the product not found",
      });
    }

    const deleteProduct = await client.product.delete({ where: { id: id } });

    if (deleteProduct) {
      res.json({
        message: "product deleted sucessfully",
      });
    }
  } catch (error) {
    console.log("unable to delete product", error);
    res.json({
      message: "something went wrong! try again later",
    });
  }
}

export async function getProducts(req: RequestExtended, res: Response) {
  try {
    const products = await client.product.findMany();

    res.json({
      message: "the products are here",
      products: products,
    });
  } catch (error) {
    console.log("cannot able to get products", error);
    res.json({
      message: "something went wrong",
    });
  }
}

export async function getProduct(req: RequestExtended, res: Response) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.json({
        message: "id not found",
      });
    }

    const findProduct = await client.product.findFirst({ where: { id: id } });

    if (!findProduct) {
      return res.json({
        message: "product not found",
      });
    }

    res.json({
      message: "request success",
      product: findProduct,
    });
  } catch (error) {
    console.log("not able to fetch the product details", error);
    res.json({
      message: "something went wrong",
    });
  }
}
