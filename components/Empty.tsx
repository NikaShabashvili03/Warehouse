import React from 'react'

export default function Empty({ text }:{text: string}) {
  return (
    <div className='w-full h-[50dvh] bg-white rounded-lg flex justify-center items-center'>
        <h2 className='text-xl font-bold text-[#2d2d2d]'>{text}</h2>
    </div>
  )
}
