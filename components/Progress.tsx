import clsx from 'clsx'
import React from 'react'
import { Circle } from './progress/Circle'


interface PartProgress {
    fields: any,
    errors: any,
    title: string
}
export default function Progress({
    fields,
    errors,
    title
}: PartProgress) {
  const { category, condition, description, manufacturer, name, price, technical } = fields;
  return (
    <div className='fixed z-30 shadow-xl lg:shadow-none mt-0 lg:mt-5 bg-white px-5 py-5 rounded-lg w-full lg:w-1/4'>
          <div className='w-full flex justify-center items-center mb-2 border-b'>
            <h2 className='font-bold text-xl mb-3'>{title}</h2>
          </div>
          <div className='[&>div:nth-last-child(-n+1)]:hidden flex lg:flex-col justify-between items-center lg:items-start'>
            <Circle  error={errors.condition || errors.category} title='ძირითადი პარამეტრები' checked={!category || !condition}/>
            <Circle error={errors.name || errors.price || errors.description} title='აღწერა და სურათები' checked={!description || !price || !name}/>
            {category && 
              <>
                <Circle error={errors.technical}  title='ტექნიკური მახასიათებლები' checked={!technical}/>
                <Circle error={errors.manufacturer} title='მოდელები' checked={!manufacturer[0].name || !manufacturer[0].toYear || !manufacturer[0].fromYear}/>
              </>
            }
          </div>
    </div>
  )
}
