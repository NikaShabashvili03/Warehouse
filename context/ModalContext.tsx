'use client'
import EditUserModal from '@/components/modals/EditUserModal'
import NewUserModal from '@/components/modals/NewUserModal'
import { SafeUser } from '@/types'
import React from 'react'

export default function ModalContext({currentUser}: {currentUser: SafeUser | any}) {
  return (
    <>
      {currentUser?.role === "Admin" && (
        <>
          <NewUserModal/>
          <EditUserModal/>
        </>
      )}
    </>
  )
}
