

import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface ButtonProps {
    text: string,
    color?: 'sky' | 'gray' | 'default',
    onClick?: () => void,
    type: 'submit' | 'button',
    size?: 'sm' | 'lg' | '2/4',
    style?: string,
    disabled?: boolean,
    icon?: string,
    iconSize?: number
}
export default function Button({
    text,
    color,
    onClick,
    type,
    size,
    disabled,
    style,
    icon,
    iconSize
}: ButtonProps) {
  return (
    <button 
    onClick={onClick} 
    type={type}
    disabled={disabled}
    className={clsx(
        'rounded-lg disabled:bg-gray-300',
        icon && 'flex justify-between items-center px-5',
        color === "sky" && 'bg-[#459bb6] disabled:bg-gray-300 hover:bg-[#56b9d8] text-white',
        color === "gray" && 'bg-gray-100 disabled:bg-gray-300 hover:bg-gray-200 text-black',
        color === "default" && 'bg-white border rounded-xl hover:bg-gray-50',
        size === 'sm' && 'w-[150px] h-[40px] text-sm',
        size === 'lg' && 'w-[250px] h-[50px] text-lg',
        size === '2/4' && 'w-2/4 h-[50px] text-base',
        style
    )}>
        <span>{text}</span>
        {icon && <Image src={icon} alt={text} width={iconSize} height={iconSize}/>}
    </button>
  )
}
