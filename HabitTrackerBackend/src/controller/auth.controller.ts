import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma.singleton";
import bcrypt from "bcryptjs";
import { createUserValidation } from "../types/User";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const signUpContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    type createUser = z.infer<typeof createUserValidation>;
    const body: createUser = req.body;
    const { success, error } = createUserValidation.safeParse(body);
    if (!success) {
      res.status(400).json({ status: false, msg: error.errors[0].message });
      return;
    }
    const checkExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (checkExist) {
      res.status(403).json({ status: false, msg: "Email already Exist " });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ status: true, msg: "User created Successfully" });
  } catch (e) {
    console.log(e);
    next();
  }
};

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const checkUserExist = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!checkUserExist) {
      res.status(401).json({ status: false, msg: "Invalid Email or Password" });
      return;
    }

    const verifyPassword = await bcrypt.compare(
      password,
      checkUserExist.password
    );
    if (!verifyPassword) {
      res.status(401).json({ status: false, msg: "Invalid Email or Password" });
      return;
    }
    const jwttoken = process.env.JWT_TOKEN;
    if (jwttoken) {
      const token = jwt.sign(
        { id: checkUserExist.user_id, email: checkUserExist.email },
        jwttoken
      );
      res
        .cookie("AccessToken", token, {
          httpOnly: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          status: true,
          user: { ...checkUserExist, password: undefined },
        });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

export const signOutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res
      .status(200)
      .clearCookie("AccessToken", { httpOnly: true })
      .json({ status: true, msg: "Signed Out Successfully" });
  } catch (error) {
    console.log(true);
    next();
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        name: true,
        email: true,
        password : true
      },
    });
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.log(error);
    next()
  }
};


export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, password } = req.body;

    const updateData: any = { name };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: updateData,
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    console.log(error);
    next();
  }
};