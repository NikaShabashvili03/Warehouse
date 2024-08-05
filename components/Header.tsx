'use client'
import useRole from '@/hooks/useRole'
import { SafeUser } from '@/types'
import React from 'react'
import Button from './buttons/Button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Header({
    currentUser
}: {
    currentUser: SafeUser
}) {
  const role = useRole({Role: currentUser?.role})
  return (
    <div className='w-full flex items-center justify-between gap-2 py-5 px-5 border-b'>
      <div className='flex gap-5 items-center'>
        <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#556080]'>
            <Image src={'/images/placeholder.png'} alt='Placeholder' width={50} height={50}/>
        </div>
        <div className='flex flex-col leading-5'>
            <h2>{currentUser?.fullName}</h2>
            <p>{role}</p>
        </div>
      </div>
      <div>
        <Button
            type='button'
            text='გამოსვლა'
            color='sky'
            size='sm'
            onClick={() => signOut()}
        />
      </div>
    </div>
  )
}
