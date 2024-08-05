import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation';
import React from 'react'
import LoginClient from './LoginClient';



export default async function page() {
  return <LoginClient/>
}
