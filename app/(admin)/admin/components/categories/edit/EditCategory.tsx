'use client'
import Button from '@/components/buttons/Button';
import Form from '@/components/forms/Form';
import FormSection from '@/components/forms/FormSection';
import Radio from '@/components/inputs/Radio';
import CategoryModal from '@/components/modals/CategoryModal'
import { removeAllQueryString, updateQueryString } from '@/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Technical from '../Technical';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditCategory({
    allCategories,
    category
}: {
    allCategories: any,
    category: any
}) {
  const [isOpen, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const categorySearch = searchParams?.get('category');
  
  const { 
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: {
            errors,
        },
        } = useForm<FieldValues>({
                defaultValues: {
                    name: '',
                    type: '',
                },
                criteriaMode: 'all',
    });
    const [technical, setTechnical] = useState<any>({});
    const router = useRouter();
    const fields = watch();
    const [key, setKey] = useState('');
    useEffect(() => {
        setValue('name', category?.name);
        setValue('type', category?.type);
        setTechnical(category?.technical);
    }, [categorySearch])
    const [loading, setLoading] = useState(false);
    const addTechnical = () => {
        if(!key || !key.replace(/[^A-Za-z\s]/g,'')) return;
        setTechnical((prev: any) => {
            return {
                ...prev, 
                [key]: {
                    title: '',
                    values: '',
                }
            }
        })
        setKey('');
  };

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    if(Object.keys(technical).length === 0 || Object.values(technical).flatMap((item: any) => item?.values.length === 0)[0]) return null;
    setLoading(true)
    axios.post('/api/categories/edit', {
        id: category?.id,
        name: data.name,
        type: data.type,
        technical: technical
    }).then(() => {
        toast.success('Category has been updated');
        setLoading(false)
        setTechnical({})
        reset();
        router.push(removeAllQueryString());
    }).catch((err) => {
        setLoading(false)
        toast.error('something went wrong');
    })
}

  const removeCategory = () => {
    setLoading(true)
    axios.post('/api/categories/delete', {
        id: category?.id
    }).then(() => {
        setLoading(false)
        router.push(removeAllQueryString());
        toast.success('category has been removed');
    }).catch(() => {
        setLoading(false)
        toast.error('something went wrong')
    })
  }

  return (
    <div className='bg-[#f8f9fc] flex min-h-dvh justify-center items-start'>
        <div className='w-full lg:w-2/4 pb-[10dvh] lg:pb-0'>
            {isOpen && <CategoryModal query={updateQueryString} data={allCategories} onClose={() => setOpen(false)} isOpen={isOpen} />}
            <Form onSubmit={handleSubmit(onSubmit)} style=''>
                <FormSection style={'items-center'} position='horizontal' itemsPosition={category ? 'between' : 'center'}>
                    <Button
                         disabled={loading} 
                        type='button'
                        color='sky'
                        size='lg'
                        text={category?.name || 'კატეგორიის არჩევა'}
                        onClick={() => setOpen(!isOpen)}
                    />
                    {category && <button disabled={loading} type='button' onClick={() => removeCategory()}>
                        <Image src={'/icons/delete.png'} alt='delete' width={25} height={25}/>
                    </button>}
                </FormSection>
                {category && 
                    <>
                        <FormSection title='ძირითადი პარამეტრები' position='horizontal' itemsPosition='between'>
                            <label className='flex flex-col'>
                                <h2>სახელი</h2>
                                <input disabled={loading} className='px-2 py-1 border rounded-lg mt-1' {...register('name')}/>
                            </label>
                            <Radio
                                disabled={loading}
                                title='ტიპი'
                                id="type"
                                register={register}
                                defaultValue={fields?.type}
                                variants={[
                                    {
                                        text: 'ნაწილი',
                                        value: 'Part'
                                    },
                                    {
                                        text: 'დისკი',
                                        value: 'Disc'
                                    }
                                ]}
                            />
                        </FormSection>
                        <FormSection position='vertical' itemsPosition={"start"} title='ტექნიკური მახასიათებლები'>
                            {technical && Object?.values(technical)?.map((item: any, index: number) => 
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
                            <Button disabled={loading || technical && Object?.keys(technical).length === 0 || technical && Object?.values(technical).flatMap((item: any) => item?.values.length === 0)[0]} type='submit' text='რედაქტირება' color={'sky'} size={'lg'}/>
                        </FormSection>
                    </>
                }
            </Form>
      </div>
    </div>
  )
}
