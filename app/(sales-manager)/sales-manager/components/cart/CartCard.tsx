'use client'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CartCard({
    part,
}: {
    part: any,
}) { 
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onClick = () => {
    setLoading(true);
    axios.post('/api/part/basket/remove', {
      id: part?.id
    }).then(() => {
      toast.success(`Part has been removed from basket`)
      router.refresh();
      setLoading(false)
    }).catch((err) => {
      toast.error("Something went wrong")
      setLoading(false)
    })
  }
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {part.partId}
        </th>
        <td className="px-6 py-4">
            {part.name}
        </td>
        <td className="px-6 py-4">
            {part.condition}
        </td>
        <td className="px-6 py-4">
            {part.category.name}
        </td>
        <td className="px-6 py-4">
            {part.price} ₾
        </td>
        <td className="px-6 py-4">
            <button disabled={loading} onClick={() => onClick()} className="font-medium text-blue-600 dark:text-blue-500">Remove</button>
        </td>
    </tr>
  )
}