import React, { FC } from 'react'

type TProps = {
    title: string
    onClick?: () => void
    type: 'submit' | 'reset' | 'button'
}

const Button: FC<TProps> = ({ title, type, onClick }) => {
    return (
        <button
            className="rounded-xl p-2 bg-[#1E85FA] text-white text-base font-medium mt-2"
            onClick={onClick}
            type={type}
        >
            {title}
        </button>
    )
}

export default Button
