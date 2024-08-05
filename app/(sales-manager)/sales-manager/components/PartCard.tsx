'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Condition from './Condition'
import dateformat from 'dateformat'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function PartCard({
    part,
    salesManager,
}: {
    part: any,
    salesManager?: boolean
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onClick = () => {
    if(salesManager) {
      setLoading(true)
      axios.post("/api/part/basket/add", {
        id: part?.id
      }).then(() => {
        toast.success(`Part has been added in basket`)
        router.refresh();
        setLoading(false)
      }).catch((err) => {
        toast.error("Something went wrong")
        setLoading(false)
      })
    }
  }

  return (
    <div className='w-full px-5 py-5 flex flex-col items-start gap-2 rounded-lg border'>
      <div className='flex justify-between items-center w-full'>
        <h2>ID: <span className='font-bold text-lg'>{part.partId}</span></h2>
        <p className='text-sm text-gray-600'>{dateformat(part.createdAt, 'dd.mm.yyyy')}</p>
      </div>
      <img className='w-full rounded-lg aspect-video' src="https://www.shutterstock.com/image-illustration/car-parts-auto-spare-isolated-260nw-2283939101.jpg" alt="" width={500} height={200}/>
      <h2 className='text-lg ml-0'>{part.name}</h2>
      <div className='flex gap-5 items-center'>
        <Condition value={part.condition}/>
        <p className='text-base'>{part.category.name}</p>
      </div>
      <h2>{part.price.toFixed(2)} ₾</h2>
      <h2>შემქმნელი: {part.creator.fullName}</h2>
      {salesManager && <button disabled={loading} onClick={() => onClick()}>Add in Basket</button>}
    </div>
  )
}