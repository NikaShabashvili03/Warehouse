import clsx from 'clsx'
import React from 'react'


interface FormSectionProps {
    title?: string,
    children: React.ReactNode,
    itemsPosition?: "end" | "start" | 'between' | 'center' | undefined,
    error?: any,
    position: 'vertical' | 'horizontal',
    style?: any
}

export default function FormSection({
    title,
    children,
    itemsPosition,
    error,
    position,
    style
}: FormSectionProps) {
  return (
    <div className={clsx(`w-full bg-white lg:rounded-xl`,
      error && 'border-red-600 border'
    )}>
        {title && <h2 className='px-5 w-full text-lg py-5 border-b'>{title}</h2>}
        <div className={clsx(
          'px-5 w-full py-5 flex gap-5',
          position === 'vertical' && 'flex-col',
          position === 'horizontal' && 'flex-row items-start',
          itemsPosition === "end" && 'items-end',
          itemsPosition === "start" && 'items-start',
          itemsPosition === "between" && 'justify-between',
          itemsPosition === "center" && 'justify-center',
          style
        )}>
            {children}
        </div>
    </div>
  )
}
