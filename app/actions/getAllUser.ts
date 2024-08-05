import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { NextResponse } from 'next/server';


export default async function getAllUser() {
    try {
        const currentUser = await getCurrentUser();
        
        if(!currentUser || currentUser?.role != 'Admin'){
            return NextResponse.error();
        }

        const users = await prisma.user.findMany();

        const sortedUsers = users.sort((a, b) => {
            if (a.id === currentUser.id) return -1; 
            if (b.id === currentUser.id) return 1;  
            return 0;
        });
        
        return sortedUsers
    } catch (error: any) {
        throw new Error(error)
    }
}