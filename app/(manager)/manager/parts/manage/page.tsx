import getAllCategories from '@/app/actions/getAllCategories';
import getAllManufacturers from '@/app/actions/getAllManufacturers';
import getStockedPartsByCategory from '@/app/actions/getStockedPartsByCategory'
import getTechnicalsByCategory from '@/app/actions/getTechnicalsByCategory';
import React, { Suspense, lazy } from 'react'
import Loading from '@/components/loading/Loading';
import dynamic from 'next/dynamic';
import SearchPart from '@/app/(sales-manager)/sales-manager/components/manage/SearchPart';

const ManagePart = dynamic(() => import('../../../../(sales-manager)/sales-manager/components/manage/ManagePart'), {
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
    type: 'Part',
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
    type: 'Part'
  });
  const technicals = await getTechnicalsByCategory({name: searchParams?.category});
  const manufacturers = await getAllManufacturers();

  return (
    <div className='bg-[#f8f9fc] flex flex-col lg:flex-row items-start lg:justify-center gap-5 p-10 min-h-dvh'>
      <div className='w-full lg:w-2/6'>
        <SearchPart manufacturers={manufacturers} technical={technicals} categories={categories}/>
      </div>
      <Suspense fallback={<Loading/>}>
        <ManagePart maxPage={partsByCategory.maxPage} partsByCategory={partsByCategory.data}/>
      </Suspense>
    </div>
  )
}
