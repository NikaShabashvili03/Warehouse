'use client'
import Button from '@/components/buttons/Button';
import Form from '@/components/forms/Form';
import Input from '@/components/inputs/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export default function LoginClient() {
    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
            defaultValues: {
              email: '',
              password: ''
            },
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      
      const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        signIn('credentials', { 
          ...data, 
          redirect: false,
        })
        .then((callback) => {
          if (callback?.ok) {
            toast.success("Login has been success")
            router.refresh();
            setLoading(false)
          }
          
          if (callback?.error) {
            toast.error("Auth error")
            setLoading(false)
          }
        });
      }
      
  return (
    <div className='flex justify-center px-10 bg-[#f8f9fc] items-center h-dvh'>
      <Form style='lg:!w-2/4 xl:!w-1/4 rounded-lg flex flex-col bg-white py-10 px-10' onSubmit={handleSubmit(onSubmit)}>
        <Input disabled={loading} style='!text-base !h-auto !w-auto !py-2 !px-2' required title='მაილი' type='email' id='email' register={register}/>
        <Input disabled={loading} style='!text-base !h-auto !w-auto !py-2 !px-2' required title='პაროლი' type='password' id='password' register={register}/>
        <Button disabled={loading} type='submit' style='w-full' text='შესვლა' size='sm' color="sky"/>
      </Form>
    </div>
  )
}
