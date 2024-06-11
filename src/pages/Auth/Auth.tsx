import React from 'react'
import Input from '../../components/Input'
import { useForm } from 'react-hook-form'
import { authSchema, TAuth } from '../../utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { client } from '../../utils/axios'
import { toast } from 'react-toastify'
import { toastError, toastSuccess } from '../../components/toasts'

const Auth = () => {
    const authFields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
    ]

    const navigate = useNavigate()
    const { control, handleSubmit } = useForm<TAuth>({
        resolver: zodResolver(authSchema),
    })

    const onLogin = async (data: TAuth) => {
        console.log(data)
        try {
            const res = await client.post('/users/login-user/', data)
            navigate('/profile')
            toastSuccess('You successfully logged in!')
            localStorage.setItem('account', JSON.stringify(res.data))
            localStorage.setItem('access', res.data.access)
        } catch (error) {
            toastError('Something wrong!')
            console.log('error')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <form
                className="lg:w-1/3 min-[320px]:w-full min-[320]:m-2 bg-[#202123] p-10 rounded-3xl flex flex-col gap-3"
                onSubmit={handleSubmit(onLogin)}
            >
                <h2 className="text-white text-3xl font-medium text-center mb-4">
                    Log in
                </h2>
                {authFields.map(({ name, label, type }) => (
                    <Input
                        key={name}
                        name={name}
                        label={label}
                        control={control}
                        type={type}
                    />
                ))}
                <Button title="LOGIN" type="submit" />
                <Link to="/registration">
                    <p className="text-white text-end">Register</p>
                </Link>
            </form>
        </div>
    )
}

export default Auth
