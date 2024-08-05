import React from 'react'
import PartCard from '../PartCard'

export default function Category({category, salesManager}: {category: any, salesManager?: boolean}) {
  return (
    <div className='bg-white p-5 rounded-lg'>
        <div className='w-full flex items-center justify-between'>
          <h2 className='text-3xl mb-1 sm:text-lg font-bold ml-1'>ID: {category.id} <span className='font-normal'>{category.name}</span></h2>
          <p className='font-semibold'>{category.data.length} <span className='font-normal'>ცალი</span></p>
        </div>
        <hr/>
        <br/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
          {category.data.map((part: any, i: any) => <PartCard salesManager={salesManager} key={i} part={part}/>)}
        </div>
      </div>
  )
}
