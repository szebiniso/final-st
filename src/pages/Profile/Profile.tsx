import React, { useEffect, useState } from 'react'
import { client } from '../../utils/axios'
import Button from '../../components/Button'
import { User } from '../../utils/types/aijusrist'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState<User>()
    const account = JSON.parse(localStorage.getItem('account')!)
    const navigate = useNavigate()
    const getCurrentUser = async () => {
        const resp = await client.get(`users/users/${account.user_id}`)
        setUser(resp.data)
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const dataFields = [
        { value: user?.first_name, label: 'First Name' },
        { value: user?.last_name, label: 'Last Name' },
        { value: user?.email, label: 'Email' },
    ]

    const goToEditPage = () => {
        navigate(`/profile/${account.user_id}`)
    }

    return (
        <div className="h-screen bg-[#202123] flex flex-col gap-4 items-center justify-center">
            {dataFields.map(({ value, label }) => (
                <div className="flex gap-2 text-white">
                    <p className="text-2xl font-medium ">{label}</p>
                    <p className="text-xl">: {value}</p>
                </div>
            ))}

            <Button title="Update" type="button" onClick={goToEditPage} />
        </div>
    )
}

export default Profile
