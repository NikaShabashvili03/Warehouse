'use client'

import useRoutes from '@/hooks/useRoutes';
import { Role } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface SidebarProps {
    children: React.ReactNode,
    role: Role | undefined,
    length?: number
}

export default function Sidebar({
    children,
    length,
    role,
}: SidebarProps) {
  const routes = useRoutes({
    role: role,
    length: length ? length : undefined
  })
  const [open, setOpen] = useState(false);
  if(role === "Admin"){
    return (
      <div className='flex h-dvh relative'>
        <div className='w-full lg:w-[95%]'>
          {children}
        </div>
        <div className={'fixed z-40 lg:relative flex lg:flex-col bottom-0 lg:bottom-auto items-center lg:py-5 w-full min-h-[9dvh] lg:w-[10%]'}>
          <div className='flex min-h-[9dvh] overflow-y-auto fixed lg:flex-col bg-white border-t items-start lg:items-center lg:border-l bottom-0 lg:top-0 w-full lg:h-dvh lg:w-[10%] py-5 lg:py-10 px-5 justify-between gap-5'>
              <button onClick={() => setOpen(!open)} className='flex hover:bg-gray-300 rounded-lg lg:hidden'>
                <Image className={clsx(
                  open ? 'rotate-0' : 'rotate-180'
                )} src={'/icons/dropdown.svg'} alt='' width={25} height={25}/>
              </button>
              {routes?.map((item: any, i:any) =>
                  <div className='flex flex-col justify-center items-center gap-5' key={i}>
                      <h2 className='text-center font-bold'>{item.title}</h2>
                      <div className={clsx(
                        '',
                        open ? 'block lg:block' : 'hidden lg:block'
                      )}>
                        {item?.routes.map((item: any,i:any) => 
                          <Link key={i} href={item?.link}>
                              <div className={clsx('relative p-2',
                                item.active && 'bg-gray-300 rounded-xl'
                              )}>
                                {item.length > 0 && <span className='absolute -top-2 flex justify-center min-w-6 px-1 items-center rounded-full text-white -right-3 bg-red-600'>{item.length}</span>}
                                <Image src={item?.icon} alt='basket' width={30} height={30}/>
                              </div>
                          </Link>
                        )}
                      </div>
                  </div>
              )}
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className='flex h-dvh relative'>
      <div className='w-full lg:w-[95%]'>
        {children}
      </div>
      <div className='fixed lg:relative flex lg:flex-col bottom-0 lg:bottom-auto items-center lg:py-5 w-full lg:w-[10%] bg-blue-300'>
        <div className='flex fixed lg:flex-col bg-white border-t items-center lg:border-l bottom-0 lg:top-0 w-full lg:h-dvh lg:w-[10%] py-5 lg:py-10 px-5 justify-between gap-5'>
            {routes?.map((item: any, i:any) => 
              <Link key={i} href={item?.link}>
                  <div className={clsx('relative p-2',
                    item.active && 'bg-gray-300 rounded-xl'
                  )}>
                    {item.length > 0 && <span className='absolute -top-2 flex justify-center min-w-6 px-1 items-center rounded-full text-white -right-3 bg-red-600'>{item.length}</span>}
                    <Image src={item?.icon} alt='basket' width={30} height={30}/>
                  </div>
              </Link>
            )}
          </div>
        </div>
    </div>
  )
}
