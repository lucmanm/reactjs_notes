
import z from "zod"

export const loginSchama = z.object({
    email: z.string().email().min(1, "Please enter email adress"),
    password: z.string().min(1, "Please enter password")
})


