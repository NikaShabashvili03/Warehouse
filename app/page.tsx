import Image from "next/image";
import HomeClient from './HomeClient';
import getCurrentUser from "./actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Home({}: {}) {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    redirect('/auth/sign-in');
  }
  if(currentUser?.role === 'SalesManager') redirect('/sales-manager');
  if(currentUser?.role === 'Manager') redirect('/manager')
  if(currentUser?.role === 'Admin') redirect('/admin')

  
  return;
}