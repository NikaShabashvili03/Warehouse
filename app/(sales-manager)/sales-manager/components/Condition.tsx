import clsx from 'clsx'
import React from 'react'

export default function Condition({
    value
}: {
    value: 'New' | 'Secondary'
}) {
  return (
    <h2 className={clsx(
        'px-5 py-1 text-sm rounded-full text-white font-bold',
        value === 'Secondary' && 'bg-[#e68280]',
        value === 'New' && 'bg-[#8cc6c4]'
    )}>
      {value === "New" && 'ახალი'}
      {value === "Secondary" && 'მეორადი'}
    </h2>
  )
}
