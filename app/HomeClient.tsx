import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface HomeClientProps {
  parts: string,
  discs: string,
  sold: boolean,
  text: string
}
export default function HomeClient({
  parts,
  discs,
  sold,
  text
}: HomeClientProps) {
  return (
    <div className="container mt-24 lg:mt-0 h-dvh flex w-full items-center md:justify-center px-10 flex-col">
      <div>
        <h2 className="text-2xl mb-5 self-start">{text}</h2>
        <div className="grid mb-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-auto">
          <Link href={parts} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
            <Image className="w-[150px] aspect-square" src={'/images/engine.png'} alt="" width={500} height={500}/>
            <h2 className="text-lg mt-2 mb-1 text-center font-bold">ნაწილები</h2>
            <p className="text-gray-400 text-center">ტრანსპორტის მსხვილი ან მცირე ნაწილები</p>
          </Link>
          <Link href={discs} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
            <Image className="w-[150px] aspect-square" src={'/images/disc.png'} alt="" width={500} height={500}/>
            <h2 className="text-lg mt-2 mb-1 text-center font-bold">დისკები და საბურავები</h2>
            <p className="text-gray-400 text-center">დისკები ან საბურავები ერთად ან ცალცალკე</p>
          </Link>
          {sold && <Link href={'/sold'} className="p-5 w-[300px] h-[300px] bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow hover:border-[#459bb6]">
            <Image className="w-[150px] aspect-square" src={'/images/sold.png'} alt="" width={500} height={500}/>
            <h2 className="text-lg mt-2 mb-1 text-center font-bold">გაყიდული პროდუქტები</h2>
            <p className="text-gray-400 text-center">გაყიდული პროდუქტები</p>
          </Link>}
        </div>
      </div>
  </div>
  )
}
