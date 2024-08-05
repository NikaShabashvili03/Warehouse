import Button from '@/components/buttons/Button';
import React, { useState } from 'react'

export default function Technical({
    technicals,
    setTechnical,
    technical,
    index
}: any) {
    const [value, setValue] = useState('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const updatedTechnical = {
        ...technicals,
        [key]: {
            ...technicals[key],
            title: e.target.value
        }
        };
        setTechnical(updatedTechnical);
    };

    // Function to handle adding a value to the values array of a specific nested object
    const handleAddValue = (key: string) => {
        if(!value) return;
        const updatedTechnical = {
        ...technicals,
        [key]: {
            ...technicals[key],
            values: [...technicals[key].values, value]
        }
        };
        setValue('');
        setTechnical(updatedTechnical);
    };

    // Function to handle removing a value from the values array of a specific nested object
    const handleRemoveValue = (key: string, index: number) => {
        const updatedValues = [...technicals[key].values];
        updatedValues.splice(index, 1);

        const updatedTechnical = {
        ...technicals,
        [key]: {
            ...technicals[key],
            values: updatedValues
        }
        };
        setTechnical(updatedTechnical);
    };
    
  return (
    <div className='w-full flex-col justify-center items-center flex'>
        <h2 className='text-center font-bold text-lg mb-5'>{Object.keys(technicals)[index]}</h2>
        <div className='w-1/4 h-[1px] bg-gray-300 rounded-full'></div>
        <div className='flex w-full border-b py-5 flex-row justify-between'>
        {/* key */}
        <div className='flex flex-col gap-10'>
                {/* title */}
                <label className='flex flex-col'>
                    <h1 className='mb-1 text-base'>სახელი <span className='text-red-600'>*</span></h1>
                    <input
                        className='border px-2 py-1 rounded-lg'
                        required
                        value={technical.title}
                        onChange={(e) => handleTitleChange(e, Object.keys(technicals)[index])}
                        placeholder={'სახელი'}
                    />
                </label>
                <label className='flex flex-col items-start gap-2'>
                    <h1>ღირებულებები</h1>
                    <input 
                        className='border px-2 py-1 rounded-lg'
                        value={value} 
                        onChange={(e: any) => setValue(e.target.value)} 
                        type='text'
                        placeholder='ნაწილები'/>
                    <Button style='px-2 py-1' color='sky' type='button' onClick={() => handleAddValue(Object.keys(technicals)[index])} text="დამატება"/>
                </label>
        </div>
            <div className='w-[35%] flex flex-col gap-2'>
                <h2>ღირებულებები</h2>
                <div className='flex w-full shadow bg-[#f8f9fc] min-h-[300px] max-h-[300px] p-2 gap-2 py-5 overflow-scroll justify-start items-center flex-col'>
                    {technical?.values && technical?.values?.map((item: any, i: any) => 
                        <div className='w-full justify-between bg-white flex px-5 py-2' key={i}>
                            {item}
                            <button onClick={() => handleRemoveValue(Object.keys(technicals)[index], i)} type='button'>X</button>
                        </div>
                    ).reverse()}
                </div>
            </div>
        </div>
    </div>
  )
}
