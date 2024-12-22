import { NextFunction, Request, Response } from "express";
import { createHabitValidation } from "../types/Habit";
import { z } from "zod";
import prisma from "../utils/prisma.singleton";

export const createHabitController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    type createHabit = z.infer<typeof createHabitValidation>;
    const body: createHabit = req.body;
    const { success, error } = createHabitValidation.safeParse(body);
    if (!success) {
      res.status(400).json({ status: false, msg: error.errors[0].message });
      return;
    }

    const newHabit = await prisma.habit.create({
      data: {
        title: body.title,
        status: body.status,
        frequency: body.frequency,
        userId: body.userId,
        progress: [],
      },
    });

    res.status(201).json({
      status: true,
      msg: "Habit created successfully",
      data: newHabit,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editHabitController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habitId = parseInt(req.params.id);
    const { title, status, frequency, progress } = req.body;

    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: { title, status, frequency, progress },
    });
    res.status(200).json({
      status: true,
      msg: "Habit updated successfully",
      data: updatedHabit,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteHabitController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habitId = parseInt(req.params.id);
    await prisma.habit.delete({
      where: { id: habitId },
    });
    res.status(200).json({
      status: true,
      msg: "Habit deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getHabitsPerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const userId = parseInt(req.params.id);

    const habits = await prisma.habit.findMany({
      where: { userId },
    });
    res.status(200).json({
      status: true,
      data: habits,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
