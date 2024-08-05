import clsx from 'clsx';
import React from 'react'

interface FormProps {
    children: React.ReactNode,
    onSubmit?: () => void;
    style: string
}
export default function Form({
    children,
    onSubmit,
    style
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={clsx(
      'w-full py-5 flex flex-col gap-10',
      style
    )}>
        {children}
    </form>
  )
}
