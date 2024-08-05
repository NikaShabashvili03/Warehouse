import React from 'react'
import getAllManufacturers from '@/app/actions/getAllManufacturers';


import dynamic from 'next/dynamic'
import Loading from '@/components/loading/Loading'
 
const EditModels = dynamic(() => import('../../components/models/edit/EditModel'), {
  loading: () => <Loading/>,
})

export default async function page() {

  const manufacturers = await getAllManufacturers();

  return <EditModels manufacturers={manufacturers}/>
}
