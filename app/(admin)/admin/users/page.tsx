import React from 'react'
import getAllUser from '@/app/actions/getAllUser'
import getCurrentUser from '@/app/actions/getCurrentUser';
import { redirect } from 'next/navigation';

import dynamic from 'next/dynamic'
import Loading from '@/components/loading/Loading'
 
const Users = dynamic(() => import('../components/users/Users'), {
  loading: () => <Loading/>,
})

export default async function page() {
  const allUsers = await getAllUser();
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    redirect('/auth/sign-in');
  }

  return (
    <div>
      <Users currentUser={currentUser} allUsers={allUsers}/>
    </div>
  )
}
