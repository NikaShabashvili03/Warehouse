'use client'
import { SafeUser } from '@/types'
import React from 'react'
import User from './User'
import Button from '@/components/buttons/Button'
import useNewUserModal from '@/hooks/useNewUserModal'

export default function Users({
    allUsers,
    currentUser
}: {
    allUsers: SafeUser[] | any
    currentUser?: SafeUser | undefined
}) {
  const { onOpen} = useNewUserModal();
  return (
        <div>
            <div className='w-full px-5 flex items-center justify-between py-5'>
                <h2 className='font-bold text-xl'>მომხმარებლები</h2>
                <Button
                    text='დამატება'
                    type='button'
                    color='sky'
                    size='sm'
                    onClick={onOpen}
                />
            </div>
            <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-[#459bb6] text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3">ID</th>
                        <th className="px-5 py-3">Full Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">User Role</th>
                        <th className="px-5 py-3">Created at</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-500 [&>*:nth-child(1)]:rounded-full">
                        {allUsers?.map((user: SafeUser, i: number) =>
                            <User user={user} me={currentUser?.id === user?.id} key={i}/>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
  )
}
