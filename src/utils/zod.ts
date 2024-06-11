import { z } from 'zod'

export const authSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z
        .string({ required_error: 'Password is required!' })
        .min(1, 'Password is required!'),
})

export type TAuth = z.infer<typeof authSchema>

export const registerSchema = z
    .object({
        first_name: z.string({ required_error: 'First Name is required!' }),
        last_name: z.string({ required_error: 'Last Name is required!' }),
        email: z.string({ required_error: 'Email is required!' }).email(),
        password: z
            .string({ required_error: 'Password is required!' })
            .min(1, 'Password is required!'),
        password_confirmation: z
            .string()
            .min(1, { message: 'Password confirmation is required!' }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ['password_confirmation'],
        message: 'Passwords does not match',
    })

export type TRegistration = z.infer<typeof registerSchema>

export const userUpdateSchema = z.object({
    first_name: z.string({ required_error: 'First Name is required!' }),
    last_name: z.string({ required_error: 'Last Name is required!' }),
})
export type TUserUpdate = z.infer<typeof userUpdateSchema>
