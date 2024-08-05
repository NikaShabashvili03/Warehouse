'use client'
import React, { useState } from 'react'
import clsx from 'clsx';
import Image from 'next/image';
import BasketedCard from './CartCard';
import Button from '@/components/buttons/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CartCard from './CartCard';
import Empty from '../../../../../components/Empty';
import PaymentModal from '@/components/modals/PaymentModal';

interface BasketedPartProps {
    allParts: any,
}
export default function Cart({
  allParts,
}: BasketedPartProps) {
  const basketIsEmpty = allParts?.parts?.length <= 0 || !allParts;

  const [isOpen, setOpen] = useState(false);

  if(basketIsEmpty) {
    return <Empty text='კალათა ცარიელია'/>
  }

  const onClick = () => {
    setOpen(!isOpen);
  }

  return (
    <div className="relative h-[91dvh] lg:h-dvh flex flex-col justify-between shadow-md sm:rounded-lg">
      <PaymentModal allParts={allParts} isOpen={isOpen} onClose={() => setOpen(false)}/>
      <table className="w-full max-h-[90%] text-sm text-left overflow-x-auto rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Condition
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Remove
                  </th>
              </tr>
          </thead>
          <tbody>
              {allParts?.parts?.map((part: any, i: any) => <CartCard key={i} part={part}/>)}
          </tbody>
      </table>
      <div className='h-[10%] w-full border-t shadow bg-white gap-5 flex justify-end px-10 items-center'>
        <h2>{allParts?.totalPrice.toFixed(2)} ₾</h2>
        <Button text='გაყიდვა' color='sky' style='px-5 py-2' type='button' onClick={onClick}/>
      </div>
  </div>
  )
}
