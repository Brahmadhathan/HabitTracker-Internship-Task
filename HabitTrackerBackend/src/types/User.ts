import { z } from "zod";

export const createUserValidation = z.object({
  name: z.string({ required_error: " Name is Required" }),

  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email Address"),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, "Password should be atleast 8 charachters"),
  profileImage: z.string().optional(),
});



export interface User {
  user_id : number,
  email : string
}