'use client';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import { updateQueryString } from '@/utils/utils';
import { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import useNewUserModal from '@/hooks/useNewUserModal';
import Form from '../forms/Form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import Radio from '../inputs/Radio';

const NewUserModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useNewUserModal();
  const { 
    register, 
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          role: undefined,
          password: ''
        },
  });

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios.post('/api/user/register', data).then(() => {
        reset()
        router.refresh();
        setLoading(false);
        toast.success('ახალი მომხმარებელი წარმატებით დაემატა');
        onClose();
    }).catch((err) => {
        setLoading(false);
        toast.error('Something went wrong');
    })
  }

  let bodyContent = (
    <Form onSubmit={handleSubmit(onSubmit)} style='w-full justify-center items-center px-24 gap-5'>
      <div className='w-full flex gap-5 justify-between'>
        <Input style='w-full' size='sm' id='firstName' placeholder='სახელი' required register={register} type='text' title='სახელი'/>
        <Input style='w-full' size='sm' id='lastName' placeholder='გვარი' required register={register} type='text' title='გვარი'/>
      </div>
      <div className='w-full flex flex-col gap-5'>
        <Input style='w-full' size='sm' id='email' placeholder='მაილი' required register={register} type='email' title='მაილი'/>
        <Input style='w-full' size='sm' id='password' placeholder='პაროლი' required register={register} type='password' title='პაროლი'/>
        <Radio
            register={register}
            id="role"
            required
            defaultValue='undefined'
            title='როლი'
            style='flex justify-between items-center w-full  gap-5'
            variants={[
                {
                    text: 'გაყიდვების მენეჯერი',
                    value: 'SalesManager'
                },
                {
                    text: 'საწყობის მენეჯერი',
                    value: 'Manager'
                },
                {
                    text: 'ადმინისტრატორი',
                    value: 'Admin'
                }
            ]}
        />
      </div>
      <div>

      </div>
      <Button
        text='დადასტურება'
        color='sky'
        size='sm'
        type='submit'
      />
    </Form>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={'ახალი მომხმარებელი'}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default NewUserModal;
