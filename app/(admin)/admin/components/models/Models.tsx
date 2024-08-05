'use client'
import Button from '@/components/buttons/Button';
import React, { useState } from 'react'

export default function Models({
    model,
    data,
    setData,
    index
}: {
    model: any,
    data: any,
    setData: any,
    index: number
}) {
  const [value, setValue] = useState('');
  const changeName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = [...data];
    updatedData[index] = {  
        ...updatedData[index],
        name: e.target.value.toUpperCase()  
    };
    setData(updatedData);
  }

  const handleAddValue = () => {
    const updatedData = [...data];
    updatedData[index] = { 
        ...updatedData[index], 
        models: [
            ...updatedData[index].models,
            value
        ] 
    };
    setData(updatedData);
    setValue('');
  }

  const handleRemoveValue = (i: any) => {
    const updatedData = [...data];
    updatedData[index].models.splice(i, 1);

    setData(updatedData);
};

  return (
    <div className='w-full flex-col justify-center items-center flex'>
        <h2 className='text-center font-bold text-lg mb-5'>{model.name}</h2>
        <div className='w-1/4 h-[1px] bg-gray-300 rounded-full'></div>
        <div className='flex w-full border-b py-5 flex-row justify-between'>
        {/* key */}
        <div className='flex flex-col gap-10'>
                {/* title */}
                <label className='flex flex-col'>
                    <h1 className='mb-1 text-base'>სახელი <span className='text-red-600'>*</span></h1>
                    <input className='px-2 py-2 border rounded-lg' value={model?.name} onChange={(e) => changeName(e, index)} placeholder=''/>
                </label>
                <label className='flex flex-col items-start gap-2'>
                    <h1>ღირებულებები</h1>
                    <input 
                        className='border px-2 py-1 rounded-lg'
                        value={value} 
                        onChange={(e: any) => setValue(e.target.value)} 
                        type='text'
                        placeholder='ნაწილები'/>
                    <Button style='px-2 py-1' color='sky' type='button' onClick={() => handleAddValue()} text="დამატება"/>
                </label>
        </div>
            <div className='w-[35%] flex flex-col gap-2'>
                <h2>ღირებულებები</h2>
                <div className='flex w-full shadow bg-[#f8f9fc] min-h-[300px] max-h-[300px] p-2 gap-2 py-5 overflow-scroll justify-start items-center flex-col'>
                    {model?.models && model?.models?.map((model: any, i: any) => 
                        <div className='w-full justify-between bg-white flex px-5 py-2' key={i}>
                            {model}
                            <button onClick={() => handleRemoveValue(i)} type='button'>X</button>
                        </div>
                    ).reverse()}
                </div>
            </div>
        </div>
    </div>
  )
}
