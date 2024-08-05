import useRole from '@/hooks/useRole'
import { SafeUser } from '@/types'
import React from 'react'
import dateFormat from 'dateformat'
import useEditUserModal from '@/hooks/useEditUserModal'
import Button from '@/components/buttons/Button'
import Image from 'next/image'
import clsx from 'clsx'

export default function User({
    user,
    me,
} : {
    user: SafeUser,
    me: boolean
}) {
  const role = useRole({Role: user?.role});
  const { setData, onOpen } = useEditUserModal();
  return (
      <tr>
            <td className={clsx(
                "border-b border-gray-200 px-5 py-5 text-sm",
                me && 'bg-gray-200'
            )}>
                <div className='flex items-center justify-start gap-5'>
                    <p className="whitespace-no-wrap">{user.id}</p>
                </div>
            </td>
            <td className={clsx(
                "border-b border-gray-200 px-5 py-5 text-sm",
                me && 'bg-gray-200'
            )}>
            <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#556080] flex-shrink-0">
                    <Image width={40} height={40} className="h-full w-full rounded-full" src="/images/placeholder.png" alt="placeholder" />
                </div>
                <div className="ml-3">
                    <p className="whitespace-no-wrap">{user?.fullName}</p>
                </div>
            </div>
            </td>
            <td className={clsx(
                    "border-b border-gray-200 px-5 py-5 text-sm",
                    me && 'bg-gray-200'
            )}>
                <p className="whitespace-no-wrap">{user?.email}</p>
            </td>
            <td className={clsx(
                    "border-b border-gray-200 px-5 py-5 text-sm",
                    me && 'bg-gray-200'
                )}>
                <p className="whitespace-no-wrap">{role}</p>
            </td>

            <td className={clsx(
                    "border-b border-gray-200 px-5 py-5 text-sm",
                    me && 'bg-gray-200'
                )}>
                <span className="whitespace-no-wrap">{dateFormat(user?.createdAt, 'mmm dd, yyyy')}</span>
            </td>
            <td className={clsx(
                    "border-b border-gray-200 px-5 py-5 text-sm",
                    me && 'bg-gray-200'
                )}>
                <Button
                    type='button'
                    text='რედაქტირება'
                    style='px-2 py-2 text-sm'
                    color='sky'
                    onClick={() => {
                        setData(user);
                        onOpen();
                    }}
                />
            </td>
    </tr>
  )
}
