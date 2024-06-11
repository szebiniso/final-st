import React, { useEffect, useState } from 'react'
import { client } from '../../utils/axios'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { TUserUpdate, userUpdateSchema } from '../../utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../../components/toasts'

const ProfileEdit = () => {
    const [user, setUser] = useState()
    const account = JSON.parse(localStorage.getItem('account')!)
    const navigate = useNavigate()

    const getCurrentUser = async () => {
        const resp = await client.get(`users/users/${account.user_id}`)
        setUser(resp.data)
    }

    const registrationFields = [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', disabled: true },
    ]

    const { control, handleSubmit, reset, formState } = useForm<TUserUpdate>({
        resolver: zodResolver(userUpdateSchema),
    })

    const onUpdateUserData = async (data: TUserUpdate) => {
        try {
            const res = await client.patch(
                `/users/users/${account.user_id}/`,
                data
            )
            getCurrentUser()
            navigate('/profile')
            toastSuccess('You successfully edit user info!')
        } catch (err) {
            console.log(err)
            toastError('Something wrong!')
        }
    }

    useEffect(() => {
        reset(user)
    }, [user])

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className="h-screen bg-[#202123] flex items-center justify-center">
            <form
                className="w-1/3 p-10 rounded-3xl flex flex-col gap-3"
                onSubmit={handleSubmit(onUpdateUserData)}
            >
                <h2 className="text-white text-3xl font-medium text-center mb-4">
                    Update User Detail Info
                </h2>
                {registrationFields.map(({ name, label, type, disabled }) => (
                    <Input
                        disabled={disabled}
                        key={name}
                        name={name}
                        label={label}
                        control={control}
                        type={type}
                    />
                ))}
                <Button title="Update" type="submit" />
            </form>
        </div>
    )
}

export default ProfileEdit
