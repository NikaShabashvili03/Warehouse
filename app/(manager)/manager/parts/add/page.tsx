import React, { Suspense } from 'react'
import getAllManufacturers from '@/app/actions/getAllManufacturers';
import getAllCategories from '@/app/actions/getAllCategories';
import getTechnicalsByCategory from '@/app/actions/getTechnicalsByCategory';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading/Loading';

const CreatePart = dynamic(() => import('../../components/add/CreatePart'), {
  loading: () => <Loading/>,
  ssr: false
})

interface searchParamsProps {
  category: string | undefined
}
export default async function page({
  searchParams
}: {
  searchParams: searchParamsProps;
}) {
  const manufacturers = await getAllManufacturers();
  
  const categories = await getAllCategories({
    type: 'Part'
  });

  const technical = await getTechnicalsByCategory({name: searchParams?.category});

  return <Suspense fallback={<Loading/>}>
    <CreatePart title="ნაწილები" type={'Part'} technical={technical} categories={categories} manufacturers={manufacturers}/>
  </Suspense>
}
