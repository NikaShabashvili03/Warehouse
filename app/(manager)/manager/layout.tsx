import getCurrentUser from '@/app/actions/getCurrentUser';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function layout({
    children,
  }: Readonly <{
    children: React.ReactNode;
  }>) {
  const currentUser = await getCurrentUser();
  if(!currentUser) redirect('/auth/sign-in');
  if(currentUser?.role != 'Manager' && currentUser?.role != 'Admin') redirect('/');
  
  return (
    <div>
      {children}
    </div>
  )
}
