import React from 'react'

import getAllCategories from '@/app/actions/getAllCategories'
import getCategory from '@/app/actions/getCategory';
import dynamic from 'next/dynamic'
import Loading from '@/components/loading/Loading'
 
const EditCategory = dynamic(() => import('../../components/categories/edit/EditCategory'), {
  loading: () => <Loading/>,
})

interface searchParamsProps {
    category: string | undefined,
}

export default async function page({
      searchParams
  }: {
      searchParams: searchParamsProps;
  }) {
  const allCategories = await getAllCategories({
    type: undefined
  });

  const category = await getCategory({
    category: searchParams.category
  })

  return <EditCategory category={category} allCategories={allCategories}/>
}
