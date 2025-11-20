import { Request, Response } from "express";
import { PrismaClient } from "../generated/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export async function RegisterController(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.json({
        message: "all inputs are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: { email: email, name: name, password: hashedPassword },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "user registered successful",
      token: token,
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.json({
      message: "Internal server error! pls try again later",
    });
  }
}

export async function LoginController(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({
        message: "the field are required",
      });
    }
    const findUser = await client.user.findFirst({ where: { email: email } });

    if (!findUser) {
      return res.json({
        messgae: "user is not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) {
      return res.json({
        messgae: "password mismatched",
      });
    }

    const token = jwt.sign(
      { userId: findUser.id },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.json({
      message: "something went wrong try again later",
    });
  }
}

export async function AdminRegister(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({
        message: "all the fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await client.admin.create({
      data: { email: email, password: hashedPassword },
    });

    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "admin register completed",
      token: token,
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.json({
      message: "something went wrong try again later",
    });
  }
}

export async function AdminLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        message: "fields are required",
      });
    }

    const findAdmin = await client.admin.findFirst({ where: { email: email } });

    if (!findAdmin) {
      return res.json({
        message: "the admin is not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(password, findAdmin.password);

    if (!passwordMatch) {
      return res.json({
        message: "the password mismatch",
      });
    }

    const token = jwt.sign(
      { adminId: findAdmin.id },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "login successful",
      token: token,
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.json({
      message: "something went wrong! try again later",
    });
  }
}
