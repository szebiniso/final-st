import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { registerSchema, TRegistration } from '../../utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { client } from '../../utils/axios'
import { toastError, toastSuccess } from '../../components/toasts'

const Registration = () => {
    const registrationFields = [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'text' },
        {
            name: 'password_confirmation',
            label: 'Password confirmation',
            type: 'text',
        },
    ]

    const navigate = useNavigate()

    const { control, handleSubmit } = useForm<TRegistration>({
        resolver: zodResolver(registerSchema),
    })

    const onRegister = (data: TRegistration) => {
        const resp = client
            .post('/users/users/', data)
            .then(() => {
                navigate('/')
                toastSuccess('You successfully registered!')
            })
            .catch(() => {
                console.log('error')
                toastError('Something wrong!')
            })
        console.log({ resp })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <form
                className="w-1/3 bg-[#202123] p-10 rounded-3xl flex flex-col gap-3"
                onSubmit={handleSubmit(onRegister)}
            >
                <h2 className="text-white text-3xl font-medium text-center mb-4">
                    Registration
                </h2>
                {registrationFields.map(({ name, label, type }) => (
                    <Input
                        key={name}
                        name={name}
                        label={label}
                        control={control}
                        type={type}
                    />
                ))}
                <Button title="REGISTER" type="submit" />
            </form>
        </div>
    )
}

export default Registration
