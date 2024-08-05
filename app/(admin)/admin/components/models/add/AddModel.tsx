'use client'
import Button from '@/components/buttons/Button';
import Form from '@/components/forms/Form';
import FormSection from '@/components/forms/FormSection';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Models from '../Models';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

interface DataItem {
    name: string;
    models: any[];
}
export default function AddModel() {

  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const [data, setData] = useState<DataItem[]>([])

  const addModel = () => {
        if(!key || !key.replace(/[^A-Za-z\s]/g,'')) return;
        setData((prevData) => [...prevData, { name: key.toUpperCase(), models: [] }]);
        setKey('');
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if(!data[0].name) return toast.success(":(");
    setLoading(true);
    axios.post('/api/models/add', {
      data: data
    }).then(() => {
      setKey('')
      setData([])
      toast.success('models has been added')
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      toast.success('something went wrong')
    })
  }

  return (
    <div className='bg-[#f8f9fc] flex min-h-dvh justify-center items-start'>
      <div className='w-full lg:w-2/4 pb-[10dvh] lg:pb-0'>
        <form onSubmit={(e: any) => onSubmit(e)}>
            <FormSection position='vertical' itemsPosition={"start"} title='მოდელების დამატება'>
                {data?.map((item: any, index: any) => 
                    <div className='w-full flex justify-between items-center gap-5' key={index}> 
                        <Models model={item} index={index} data={data} setData={setData}/>
                        <button disabled={loading} className='px-2 py-2 bg-gray-300 rounded-lg hover:bg-gray-200' type='button' onClick={() => {

                            setData((prev: any) => prev.filter((_: any, i: any) => i !== index));
                        }}>
                            <Image src={'/icons/close.svg'} alt='close' width={15} height={15}/>
                        </button>
                    </div>
                )}
                 <div className='flex gap-5'>
                    <input disabled={loading} value={key} onChange={(e) => setKey(e.target.value)} className='border rounded-xl px-2' placeholder='სახელი'/>
                    <Button disabled={loading} onClick={() => addModel()} type='button' text='დამატება' color={'sky'} size={'sm'}/>
                 </div>
            </FormSection>
            <FormSection position='vertical' itemsPosition={"end"}>
                <Button disabled={loading || !data[0]?.name} type='submit' text='დამატება' color={'sky'} size={'lg'}/>
            </FormSection>
        </form>
      </div>
    </div>
  )
}
