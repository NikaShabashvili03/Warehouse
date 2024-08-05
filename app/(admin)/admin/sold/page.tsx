import getAllSoldParts from '@/app/actions/getAllSoldParts';
import Loading from '@/components/loading/Loading';
import dynamic from 'next/dynamic';
import React from 'react'
const Sold = dynamic(() => import('@/app/(sales-manager)/sales-manager/components/sold/Sold'), {
  loading: () => <Loading/>
})

export default async function page() {
  const allParts = await getAllSoldParts();
  return (
    <div>
        <Sold data={allParts}/>
        {/* <div className='w-full pb-[15dvh] lg:pb-[5dvh] pt-[5dvh] bg-white flex justify-center text-lg items-center border-t-2'>
            სულ გაყიდული პროდუქტების ფასის ჯამი: <span className='text-lg ml-1 font-bold'> </span>
        </div> */}
    </div>
  )
}
