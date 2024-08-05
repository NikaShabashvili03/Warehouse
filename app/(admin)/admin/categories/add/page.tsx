import React from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/loading/Loading'
 
const AddCategory = dynamic(() => import('../../components/categories/add/AddCategory'), {
  loading: () => <Loading/>,
})

export default function page() {
  return <AddCategory/>
}
