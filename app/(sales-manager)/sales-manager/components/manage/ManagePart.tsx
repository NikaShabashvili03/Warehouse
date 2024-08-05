'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Category from './Category';
import clsx from 'clsx';
import Empty from '../../../../../components/Empty';
import Button from '@/components/buttons/Button';
import { updateQueryString } from '@/utils/utils';



interface ManagePartProps {
    partsByCategory: any,
    maxPage: number,
    salesManager?: boolean
}

export default function ManagePart({
  partsByCategory,
  maxPage,
  salesManager
}: ManagePartProps) {
  const isEmpty = partsByCategory.length <= 0;
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || "1"
  const router = useRouter();

  return (
      <div className={'flex w-full mb-[10dvh] lg:mb-0 lg:w-4/6 gap-10 flex-col'}>
          {isEmpty 
          ? <Empty text='მარაგში არ არის ნაწილები მსგავსი პარამეტრებით '/>
          : partsByCategory.map((category: any, i: any) =>
            <Category salesManager={salesManager} key={i} category={category}/>
          )}
          {!isEmpty && (
            <div className='w-full rounded-lg py-5 flex justify-center items-center gap-10 bg-white'>
              <Button
                text='Prev'
                disabled={parseInt(page) <= 1}
                onClick={() => parseInt(page) > 1 && router.push(updateQueryString('page', (parseInt(page)-1).toString()))}
                size='sm'
                color='sky'
                style=''
                type='button'
              />
              {page} / {maxPage}
              <Button
                text='Next'
                disabled={parseInt(page) >= maxPage}
                onClick={() => parseInt(page) < maxPage && router.push(updateQueryString('page', (parseInt(page)+1).toString()))}
                size='sm'
                color='sky'
                style=''
                type='button'
              />
            </div>
          )}
      </div>
  )
}
