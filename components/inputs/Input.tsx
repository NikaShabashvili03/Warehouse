import { removeQueryString, updateQueryString } from '@/utils/utils'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


interface InputProps {
    title?: string,
    placeholder?: string,
    type: string
    price?: boolean,
    register?: any,
    id: string,
    required?: boolean,
    disabled?: boolean,
    step?: string,
    min?: any,
    size?: 'sm',
    query?: boolean,
    defaultValue?: string | undefined,
    style?: string
}

export default function Input({
    title,
    placeholder,
    type,
    price,
    register,
    id,
    required,
    disabled,
    step,
    min,
    size,
    query,
    defaultValue,
    style
}: InputProps ) {
  const router = useRouter();
  return (
    <label className='flex flex-col justify-end relative'>
        {title && (
            <h1 className='text-gray-600'>{title}<span className={clsx(
                'ml-1',
                required 
                    ? 'text-red-600'
                    : 'text-yellow-300'
            )}>*</span></h1>
        )}
        {query
        ?   <input onChange={(e) => {
                const { value } = e.target;
                if(!value || value.length <= 0){
                    return router.push(removeQueryString(id, undefined))
                }
                router.push(updateQueryString(id, value))
            }} min={min} value={defaultValue} disabled={disabled} step={step} type={type} placeholder={placeholder} className={clsx(
                '[appearance:textfield] disabled:bg-gray-300 [&:disabled+div]:border-l-gray-300 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border rounded-xl focus:outline-none',
                !size && 'h-[70px] px-4  py-4 mt-2 text-lg',
                size === 'sm' && 'py-2 text-sm px-2 w-full h-[40px]',
                style
            )}/>
        :   <input min={min} disabled={disabled} step={step} {...register(id, {required: required, valueAsNumber: price})} type={type} placeholder={placeholder} className={clsx(
                '[appearance:textfield] disabled:bg-gray-300 [&:disabled+div]:border-l-gray-300 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border rounded-xl focus:outline-none',
                !size && 'h-[70px] px-4  py-4 mt-2 text-lg',
                size === 'sm' && 'py-2 text-sm px-2 w-[120px] h-[40px]',
                style
            )}/>
        }
        {price && (
            <div className={clsx(
                'absolute border-l right-0 z-10 rounded-r-xl flex justify-center items-center',
                !size && 'h-[70px] w-[100px]',
                size === 'sm' && 'h-[40px] w-2/6'
            )}>
                <span className={clsx(
                    'bg-[#459bb6] text-white rounded-full',
                    !size && 'py-2 px-4 text-lg',
                    size === 'sm' && 'px-2 py-0.5 text-base'
                )}>₾</span>
            </div>
        )}
    </label>
  )
}
