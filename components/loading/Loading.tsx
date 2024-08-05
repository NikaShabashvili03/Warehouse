import clsx from 'clsx'
import React from 'react'
import Loader from '../Loader'

export default function Loading({
}: {
}) {
  return (
    <div className={clsx(
        'w-full top-0 left-0 h-dvh fixed z-50 bg-gray-300/50 justify-center items-center',
    )}>
      <Loader size='35'/>
    </div>
  )
}
