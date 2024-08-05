import getCurrentUser from '@/app/actions/getCurrentUser';
import { redirect } from 'next/navigation';

import React from 'react'

export default async function layout({
    children,
  }: Readonly <{
    children: React.ReactNode;
  }>) {
  
  const currentUser = await getCurrentUser();

  if(currentUser){
    redirect("/");
  }

  return (
    <div>
      {children}
    </div>
  )
}
