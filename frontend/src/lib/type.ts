import z from "zod"

export type TUser = {
    email?: string;
    fullName?: string;
    password?: string
};


export const registerSchmema = z.object({
    fullName: z.string().min(1, "Please enter your full name"),
    email: z.string().email().min(1, "Please enter email adress"),
    password: z.string().min(1, "Please enter password")
})

export const loginSchema = z.object({
    email: z.string().email().min(1, "Please enter email adress"),
    password: z.string().min(1, "Please enter password")
})

export const noteSchema = z.object({
    _id: z.string().min(1, "Missing Data"),
    title: z.string(),
    content: z.string(),
    tags: z.string().array(),
    userId: z.string(),
    createdAt: z.string(),
    isPinned: z.boolean()
})
const saveTypeSchema = z.enum(["Save", "Save Changes",""])

export type TNote = z.infer<typeof noteSchema>
export type TSaveType = z.infer<typeof saveTypeSchema>

export type TNoteModal = {
    isOpen: boolean,
    type: TSaveType,
    data: TNote | null
}