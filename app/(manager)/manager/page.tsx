import getCurrentUser from '@/app/actions/getCurrentUser'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      {currentUser?.role === 'Manager' && (
          <Header currentUser={currentUser}/>
        )}
        <div className="container mt-24 lg:mt-0 h-dvh flex w-full items-center md:justify-center px-10 flex-col">
          <div>
            <h2 className="text-2xl mb-5 self-start">პროდუქტის დამატება</h2>
            <div className="grid mb-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-auto">
              <Link href={'/manager/parts/add'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                <Image className="w-[150px] aspect-square" src={'/images/engine.png'} alt="Engine" width={500} height={500}/>
                <h2 className="text-lg mt-2 mb-1 text-center font-bold">ნაწილები</h2>
                <p className="text-gray-400 text-center">ტრანსპორტის მსხვილი ან მცირე ნაწილები</p>
              </Link>
              <Link href={'/manager/discs/add'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                <Image className="w-[150px] aspect-square" src={'/images/disc.png'} alt="Disc" width={500} height={500}/>
                <h2 className="text-lg mt-2 mb-1 text-center font-bold">დისკები და საბურავები</h2>
                <p className="text-gray-400 text-center">დისკები ან საბურავები ერთად ან ცალცალკე</p>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-2xl mb-5 self-start">საწყობი</h2>
            <div className="grid mb-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-auto">
              <Link href={'/manager/parts/manage'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                <Image className="w-[150px] aspect-square" src={'/images/engine.png'} alt="Engine" width={500} height={500}/>
                <h2 className="text-lg mt-2 mb-1 text-center font-bold">ნაწილები</h2>
                <p className="text-gray-400 text-center">ტრანსპორტის მსხვილი ან მცირე ნაწილები</p>
              </Link>
              <Link href={'/manager/discs/manage'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
                <Image className="w-[150px] aspect-square" src={'/images/disc.png'} alt="Disc" width={500} height={500}/>
                <h2 className="text-lg mt-2 mb-1 text-center font-bold">დისკები და საბურავები</h2>
                <p className="text-gray-400 text-center">დისკები ან საბურავები ერთად ან ცალცალკე</p>
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}
