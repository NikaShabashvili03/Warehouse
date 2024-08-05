import getCurrentUser from '@/app/actions/getCurrentUser'
import Header from '@/components/Header';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
        {currentUser?.role === 'Admin' && (
            <Header currentUser={currentUser}/>
        )}
        <div className="container mt-24 lg:mt-0 h-dvh flex w-full items-center md:justify-start py-24 px-10 flex-col">
            <div>
                <h2 className="text-2xl mb-5 self-start">ადმინის პანელი</h2>
                <div className="grid mb-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-auto">
                <Link href={'/manager'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/addproducts.png'} alt="Add Products" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">პროდუქტების დამატება</h2>
                    <p className="text-gray-400 text-center">დაამატე პროდუქტები</p>
                </Link>
                <Link href={'/sales-manager'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/manageproducts.png'} alt="Manage products" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">პროდუქტების მართვა</h2>
                    <p className="text-gray-400 text-center">მართე პროდუქტები</p>
                </Link>
                <Link href={'/admin/sold'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/allsoldparts.png'} alt="All Sold Parts" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">ისტორია</h2>
                    <p className="text-gray-400 text-center">შეამოწმე გაყიდული პროდუქტების ისტორია</p>
                </Link>
                <Link href={'/admin/categories/add'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/addcategories.png'} alt="Add Categories" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">კატეგორიის დამატება</h2>
                    <p className="text-gray-400 text-center">დაამატე ახალი კატეგორია</p>
                </Link>
                <Link href={'/admin/categories/edit'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/editcategories.png'} alt="Edit Categories" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">კატეგორიის რედაქტირება</h2>
                    <p className="text-gray-400 text-center">დაარედაქტირე კატეგორია</p>
                </Link>
                <Link href={'/admin/models/add'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/addmanufacturer.png'} alt="Add Manufacturer" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">მწარმოებლის დამატება</h2>
                    <p className="text-gray-400 text-center">დაამატე მწარმოებლები</p>
                </Link>
                <Link href={'/admin/models/edit'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/editmanufacturer.png'} alt="Edit Manufacturer" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">მწარმოებლის რედაქტირება</h2>
                    <p className="text-gray-400 text-center">დაარედაქტირე მწარმოებლები</p>
                </Link>
                <Link href={'/admin/users'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                    <Image className="w-[150px] aspect-square" src={'/images/users.png'} alt="Users" width={500} height={500}/>
                    <h2 className="text-lg mt-2 mb-1 text-center font-bold">მომხმარებლები</h2>
                    <p className="text-gray-400 text-center">დაარედაქტირე ან დაამატე მომხმარებელი</p>
                </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
