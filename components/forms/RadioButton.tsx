import React from 'react'


interface RadioButton {
    variants: Array<string>,
    id: string,
    register: any,
    required?: boolean
}

export default function RadioButton({
    variants,
    id,
    register,
    required
}: RadioButton) {
  return (
    <div className='flex gap-5 pl-2'>
        {variants.map((variant: string, i: any) =>
            <label key={i}>
                <h2 className='px-5 w-full text-lg py-5 border-b'>{variant}</h2>
                <input {...register(id, {required: required})} name={id} type='radio'></input>
            </label>
        )}
    </div>
  )
}
