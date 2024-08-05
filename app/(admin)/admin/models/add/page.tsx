import React from 'react'

import dynamic from 'next/dynamic'
import Loading from '@/components/loading/Loading'
 
const AddModel = dynamic(() => import('../../components/models/add/AddModel'), {
  loading: () => <Loading/>,
})

export default function page() {
  return <AddModel/>
}
