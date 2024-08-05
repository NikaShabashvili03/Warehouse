import getAllCategories from '@/app/actions/getAllCategories';
import getAllManufacturers from '@/app/actions/getAllManufacturers';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getStockedPartsByCategory from '@/app/actions/getStockedPartsByCategory'
import getTechnicalsByCategory from '@/app/actions/getTechnicalsByCategory';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import SearchPart from '../../components/manage/SearchPart';
import Loading from '@/components/loading/Loading';
import dynamic from 'next/dynamic';

const ManagePart = dynamic(() => import('../../components/manage/ManagePart'), {
  loading: () => <Loading/>,
  ssr: false
})

interface searchParamsProps {
  category: string | undefined,
  morePrice: number | undefined,
  lessPrice: number | undefined,
  condition: 'New' | 'Secondary' | undefined,
  technical: string | undefined,
  manufacturer: string | undefined,
  model: string | undefined,
  toYear: string | undefined,
  fromYear: string | undefined,
  page: number | undefined
}
export default async function page({
    searchParams
}: {
    searchParams: searchParamsProps;
}) {
  const partsByCategory = await getStockedPartsByCategory({
    type: 'Disc',
    category: searchParams?.category,
    morePrice: searchParams?.morePrice,
    lessPrice: searchParams?.lessPrice,
    condition: searchParams?.condition,
    technical: searchParams?.technical,
    manufacturer: searchParams?.manufacturer,
    model: searchParams?.model,
    toYear: searchParams?.toYear,
    fromYear: searchParams?.fromYear,
    page: searchParams?.page
  });

  const categories = await getAllCategories({
    type: 'Disc'
  });
  
  const technicals = await getTechnicalsByCategory({name: searchParams?.category});
  const manufacturers = await getAllManufacturers();

  return (
    <div className='bg-[#f8f9fc] flex flex-col lg:flex-row items-start lg:justify-center gap-5 p-10 min-h-dvh'>
      <div className='w-full lg:w-2/6'>
        <SearchPart manufacturers={manufacturers} technical={technicals} categories={categories}/>
      </div>
      <Suspense fallback={<Loading/>}>
        <ManagePart salesManager maxPage={partsByCategory.maxPage} partsByCategory={partsByCategory.data}/>
      </Suspense>
    </div>
  )
}
