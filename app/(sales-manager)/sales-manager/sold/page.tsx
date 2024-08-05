import getSelledParts from '@/app/actions/getSelledParts'
import Loading from '@/components/loading/Loading';
import dynamic from 'next/dynamic';
import React from 'react'

const Sold = dynamic(() => import('@/app/(sales-manager)/sales-manager/components/sold/Sold'), {
  loading: () => <Loading/>
})

export default async function page() {
  const selledParts = await getSelledParts();

  return <Sold data={selledParts?.parts}/>
}
