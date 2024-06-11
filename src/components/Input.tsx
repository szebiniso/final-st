import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

type TProps = {
    name: string
    label: string
    control: Control<any>
    type: string
    disabled?: boolean
}

const Input: FC<TProps> = ({ label, name, control, type, disabled }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                    <label className="text-white text-base">{label}</label>
                    <input
                        disabled={disabled}
                        autoComplete="off"
                        className="px-4 py-2 rounded-xl border border-[#575757]"
                        {...field}
                        type={type}
                    />
                    {fieldState.error && (
                        <p className="text-red-500 text-sm">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    )
}

export default Input
