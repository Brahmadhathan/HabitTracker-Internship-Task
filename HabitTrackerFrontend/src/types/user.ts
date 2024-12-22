import { z } from "zod";

export const createUser = z.object({
  name: z.string({ required_error: " Name is Required" }),
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email Address"),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, "Password should be atleast 8 charachters"),
});

export const signUser = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email Address"),
  password: z.string({ required_error: "Password is Required" }),
});


export interface user {
  name : string,
  email : string,

}