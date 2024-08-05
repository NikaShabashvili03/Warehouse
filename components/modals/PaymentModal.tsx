import React, { useState } from 'react'
import Modal from '../Modal';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import Button from '../buttons/Button';
import clsx from 'clsx';
import Loader from '../Loader';


enum STEPS {
  DATA,
  PAYMENT,
  LOADING,
  COMPLETE
}

interface PaymentModalProps {
  isOpen: boolean,
  allParts: any;
  onClose: () => void;
}

export default function PaymentModal({
  isOpen,
  allParts,
  onClose
}: PaymentModalProps) {
  const [disabled, setDisabled] = useState(false);
  const [step, setStep] = useState<STEPS>(STEPS.DATA);
  const [paymentType, setPaymentType] = useState <undefined | 'Cash' | 'Card'> ();
  const [status, setStatus] = useState<undefined | 'Success' | 'Cancel'>(undefined)
  const router = useRouter();

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
          phone: ''
        },
  });

  const handleClose = () => {
    setDisabled(false);
    setPaymentType(undefined);
    setStep(STEPS.DATA);
    reset();
    setStatus(undefined);
    onClose();
    router.refresh();
  }

  const onSubmitData:SubmitHandler<FieldValues> = (data) => {
    setDisabled(true)
    setStep(STEPS.LOADING);
    axios.post('/api/part/sold', {
      parts: allParts?.parts,
      total: allParts?.totalPrice,
      type: paymentType,
      phone: data.phone,
      name: data.name
    }).then(() => {
      toast.success('Parts has been sold');
      setStep(STEPS.COMPLETE);
      setStatus('Success')
    }).catch((err) => {
      toast.error('something went wrong')
      setDisabled(false);
      setStep(STEPS.PAYMENT);
      setStatus('Cancel');
    })
  }


  let bodyContent;

  if(step === STEPS.DATA){
    bodyContent = (
      <div className='flex flex-col gap-5'>
        <Input type='text' disabled={disabled} title='name' id='name' placeholder='Name Surname' register={register}/>
        <Input type='tel' disabled={disabled} title='phone' placeholder='+995 (555) 55 55 55' id='phone' register={register}/>
        <div className='w-full flex justify-center items-center'>
          <Button onClick={() => setStep(STEPS.PAYMENT)} text='Next' color='sky' size='lg' disabled={disabled} type='button'/>
        </div>
      </div>
    )
  }

  if(step === STEPS.PAYMENT){
    bodyContent = (
      <div className='flex justify-center flex-col gap-5 items-center'>
        <div className='flex justify-between flex-col lg:flex-row gap-5 items-center'>
          <button onClick={() => setPaymentType('Card')} className={clsx(
            "p-5 w-[300px] h-[300px] aspect-square bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow",
            paymentType === 'Card' ? 'border-[#459bb6] scale-90' : 'hover:border-[#459bb6]'
          )}>
            <Image className="w-[150px] aspect-square" src={'/icons/card.png'} alt="Sold Products" width={500} height={500}/>
            <h2 className="text-lg mt-2 mb-1 text-center font-bold">ბარათით გადახდა</h2>
          </button>
          <button onClick={() => setPaymentType('Cash')} className={clsx(
            "p-5 w-[300px] h-[300px] aspect-square bg-[#f8f9fc] flex justify-center items-center flex-col rounded-xl border hover:shadow",
            paymentType === 'Cash' ? 'border-[#459bb6] scale-90' : 'hover:border-[#459bb6]'
          )}>
            <Image className="w-[150px] aspect-square" src={'/icons/cash.png'} alt="Sold Products" width={500} height={500}/>
            <h2 className="text-lg mt-2 mb-1 text-center font-bold">ქეშით გადახდა</h2>
          </button>
        </div>
        <div className='flex gap-5 justify-center'>
          <Button onClick={() => setStep(STEPS.DATA)} text='Back' style='w-[300px] py-4' color='sky' disabled={disabled} type='button'/>
          <Button onClick={handleSubmit(onSubmitData)} text='Submit' color='sky' style='w-[300px] py-4' disabled={disabled || paymentType === undefined} type='button'/>
        </div>
      </div>
    )
  }
  
  if(step === STEPS.LOADING){
    bodyContent = (
      <div className='flex justify-center h-[300px] flex-col gap-5 items-center'>
          <Loader/>
      </div>
    )
  }

  if(step === STEPS.COMPLETE) {
    bodyContent = (
      <div className='flex justify-between h-[300px] flex-col gap-5 items-center'>
        {status === 'Success' && <div className='h-2/4 w-full flex justify-center items-center'>Success</div>}
        {status === 'Cancel' && <div className='h-2/4 w-full flex justify-center items-center'>Cancle</div>}
        <Button onClick={() => handleClose()} size='lg' color='sky' text='Close' type='button'/>
      </div>
    )
  }

  return (
    <Modal 
      isOpen={isOpen}
      onClose={handleClose}
      body={bodyContent}
      title='გადახდის მეთოდი'
      disabled={disabled || step === STEPS.LOADING}
    />
  )
}
