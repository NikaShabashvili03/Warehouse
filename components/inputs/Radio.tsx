import { removeQueryString, updateQueryString } from '@/utils/utils';
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'


interface Radio {
    variants: Array<object>,
    id: string,
    register?: any,
    required?: boolean,
    title?: string,
    disabled?: boolean,
    query?: boolean,
    defaultValue?: string | undefined,
    style?: string,
    onChange?: any
}

export default function Radio({
    variants,
    id,
    register,
    required,
    title,
    disabled,
    query,
    defaultValue,
    style,
    onChange
}: Radio) {
  const router = useRouter();
  return (
    <div className='flex flex-col'>
        {title && <h1 className='text-gray-600'>{title}<span className={clsx(
            'ml-1',
            required 
                ? 'text-red-600'
                : 'text-yellow-300'
        )}>*</span></h1>}
        <div className={style}>
            {variants?.map((variant: any, i: any) =>
                <label key={i}>
                    {query
                        ?   <input onChange={(e) => {
                                const { value } = e.target;
                                if(!value){
                                    return router.push(removeQueryString(id, undefined))
                                }
                                router.push(updateQueryString(id, value))
                            }} disabled={disabled} defaultChecked={variant?.value === defaultValue ? true : false} value={variant?.value} className='invisible [&:disabled+span]:bg-gray-300 [&:checked+span]:border-[#459bb6] [&:checked+span]:bg-[#e8f4f7]' name={id} type='radio'></input>
                        :   <input disabled={disabled} value={variant?.value} className='invisible [&:disabled+span]:bg-gray-300 [&:checked+span]:border-[#459bb6] [&:checked+span]:bg-[#e8f4f7]' {...register(id, {required: required})} name={id} type='radio'></input>
                    }
                    <span className='px-5 text-sm flex justify-center items-center rounded-lg py-1 border'>{variant?.text}</span>
                </label>
            )}
        </div>
    </div>
  )
}
