'use client'
import Button from '@/components/buttons/Button';
import Form from '@/components/forms/Form';
import FormSection from '@/components/forms/FormSection';
import Input from '@/components/inputs/Input';
import Radio from '@/components/inputs/Radio';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Technical from '../Technical';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddCategory() {
    const { 
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
        } = useForm<FieldValues>({
                defaultValues: {
                    name: '',
                    type: undefined,
                },
                criteriaMode: 'all',
    });
    const [technical, setTechnical] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        if(Object.keys(technical).length === 0 || Object.values(technical).flatMap((item: any) => item?.values.length === 0)[0]) return null;
        setLoading(true);
        axios.post('/api/categories/add', {
            name: data.name,
            type: data.type,
            technical: technical
        }).then(() => {
            setLoading(false)
            toast.success('Category has been add')
            reset();
            setKey('');
            setTechnical({});
        }).catch((err) => {
            setLoading(false)
            toast.error("somethins went wrong")
        })
    }

    const [key, setKey] = useState('');
    const addTechnical = () => {
        if(!key || !key.replace(/[^A-Za-z\s]/g,'')) return;
        setTechnical((prev: any) => {
            return {
                ...prev, 
                [key]: {
                    title: '',
                    values: [],
                }
            }
        })
        setKey('');
    };
  return (
    <div className='bg-[#f8f9fc] flex min-h-dvh justify-center items-start'>
      <div className='w-full lg:w-2/4 pb-[10dvh] lg:pb-0'>
        <Form style='' onSubmit={handleSubmit(onSubmit)}>
            <FormSection position='horizontal' itemsPosition={"between"} title='ძირითადი პარამეტრები'>
                <Input disabled={loading} style='!px-2 !text-base !h-auto !py-1' type='text' required title='სახელი' placeholder='კატეგორიის სახელი' id='name' register={register}/>
                <Radio disabled={loading} register={register} title="ტიპი" style='flex gap-5' required id="type" variants={[
                    {
                        text: 'ნაწილი',
                        value: 'Part'
                    },
                    {
                        text: 'დისკი',
                        value: 'Disc'
                    }
                ]}/>
            </FormSection>
            <FormSection position='vertical' itemsPosition={"start"} title='ტექნიკური მახასიათებლები'>
                {Object?.values(technical)?.map((item: any, index: number) => 
                    <div className='w-full flex justify-between items-center gap-5' key={index}> 
                        <Technical index={index} technical={item} technicals={technical} setTechnical={setTechnical}/>
                        <button disabled={loading} className='px-2 py-2 bg-gray-300 rounded-lg hover:bg-gray-200' type='button' onClick={() => {
                            const newObj = { ...technical };
                            delete newObj[Object.keys(newObj)[index]];
                            setTechnical(newObj);
                        }}>
                            <Image src={'/icons/close.svg'} alt='close' width={15} height={15}/>
                        </button>
                    </div>
                 )}
                 <div className='flex gap-5'>
                    <input disabled={loading} value={key} onChange={(e) => setKey(e.target.value)} className='border rounded-xl px-2' placeholder='გასარები'/>
                    <Button disabled={loading} onClick={() => addTechnical()} type='button' text='დამატება' color={'sky'} size={'sm'}/>
                 </div>
            </FormSection>
            <FormSection position='vertical' itemsPosition={"end"}>
                <Button  disabled={loading || Object.keys(technical).length === 0 || Object.values(technical).flatMap((item: any) => item?.values.length === 0)[0]} type='submit' text='დამატება' color={'sky'} size={'lg'}/>
            </FormSection>
        </Form>
      </div>
    </div>
  )
}
