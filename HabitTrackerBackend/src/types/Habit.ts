import { z } from "zod";


export const createHabitValidation = z.object ({
    title : z.string(),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly']),  
    status: z.enum(['Active', 'Inactive']),
    userId : z.number({required_error: "User Id is Required"})
})