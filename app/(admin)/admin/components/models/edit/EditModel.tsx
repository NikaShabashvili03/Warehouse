'use client'
import Button from '@/components/buttons/Button';
import Form from '@/components/forms/Form';
import FormSection from '@/components/forms/FormSection';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Models from '../Models';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface DataItem {
    name: string;
    models: any[];
}
export default function EditModels({
  manufacturers
}: {
  manufacturers: any
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataItem[]>(manufacturers)
  const router = useRouter();

  useEffect(() => {
    setData(manufacturers);
  }, [manufacturers])
  
  const removeModel = (id: any) => {
    setLoading(true);
    axios.post('/api/models/delete', {
      id: id
    }).then(() => {
      toast.success('Model has been removed');
      router.refresh();
      setLoading(false);
    }).catch((err) => {
      toast.error('something went wrong')
      setLoading(false);
    })
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/api/models/edit', {
      data: data
    }).then(() => {
      toast.success('models has been updated');
      router.refresh();
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      toast.error('something went wrong');
    })
  }

  return (
    <div className='bg-[#f8f9fc] flex min-h-dvh justify-center items-start'>
      <div className='w-full lg:w-2/4 pb-[10dvh] lg:pb-0'>
        <form onSubmit={(e) => onSubmit(e)}>
            <FormSection position='vertical' itemsPosition={"start"} title='მოდელების რედაქტირება'>
                {data?.map((item: any, index: any) => 
                    <div className='w-full flex justify-between items-center gap-5' key={index}> 
                        <Models model={item} index={index} data={data} setData={setData}/>
                        <button disabled={loading} className='px-2 py-2 rounded-lg' type='button' onClick={() => removeModel(item.id)}>
                          <Image src={'/icons/delete.png'} alt='delete' width={25} height={25}/>
                        </button>
                    </div>
                )}
            </FormSection>
            <FormSection position='vertical' itemsPosition={"end"}>
                <Button disabled={loading} type='submit' text='რედაქტირება' color={'sky'} size={'lg'}/>
            </FormSection>
        </form>
      </div>
    </div>
  )
}
