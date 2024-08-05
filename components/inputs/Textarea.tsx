import clsx from 'clsx'
import React from 'react'


interface TextareaProps {
    title: string,
    placeholder?: string,
    id: string,
    register?: any,
    required?: boolean,
    disabled?: boolean
}
export default function Textarea({
    title,
    placeholder,
    id,
    register,
    required,
    disabled
}: TextareaProps) {
  return (
    <label className='flex flex-col justify-end relative'>
        <h1 className='text-gray-600'>{title}<span className={clsx(
            'ml-1',
            required 
                ? 'text-red-600'
                : 'text-yellow-300'
        )}>*</span></h1>
        <textarea disabled={disabled} {...register(id, {required: required})} placeholder={placeholder} className='resize-none disabled:bg-gray-300 px-4  py-4 h-[200px] border mt-2 rounded-xl text-base focus:outline-none'/>
    </label>
  )
}
