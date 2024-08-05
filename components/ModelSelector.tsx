import Button from '@/components/buttons/Button';
import Select from '@/components/selects/Select'
import { allManufacturersProps } from '@/types';
import { getYears } from '@/utils/utils';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


interface ModalSelectorProps {
    index: number,
    setValue?: any,
    manufacturers: allManufacturersProps[],
    remove?: any,
    fields?: any,
    clearErrors?: any,
    disabled?: boolean,
    query?: any,
    style: string
}

export default function ModelSelector({
    index,
    manufacturers,
    setValue,
    remove,
    fields,
    clearErrors,
    disabled,
    query,
    style
}: ModalSelectorProps) {

  const searchParams = useSearchParams();
  const searchManufacturer = searchParams?.get('manufacturer');
  const searchModel = searchParams?.get('model');
  const searchToYear = searchParams?.get('toYear');
  const searchFromYear = searchParams?.get('fromYear');

  const [selectedManufacturer, setSelectedManufacturer] = useState({
    name: query ? searchManufacturer || 'მწარმოებელი' : 'მწარმოებელი',
    models: manufacturers?.filter((item) => item.name === searchManufacturer)[0]?.models || []
  });

  const [selectedModel, setSelectedModel] = useState(query ? searchModel || 'მოდელი' : 'მოდელი');
  const [selectedFromYear, setSelectedFromYear] = useState(query ? searchFromYear || 'წელი' : 'წელი');
  const [selectedToYear, setSelectedToYear] = useState(query ? searchToYear || 'წელი' : 'წელი')
  
  useEffect(() => {
    setSelectedModel(query ? searchModel || 'მოდელი' : 'მოდელი');
    setSelectedFromYear(query ? searchFromYear || 'წელი' : 'წელი');
    setSelectedToYear(query ? searchToYear || 'წელი' : 'წელი');
    if(query){
      setSelectedModel('მოდელი');
      setSelectedFromYear('წელი');
      setSelectedToYear('წელი');
    }
    if(setValue) {
      setValue(`manufacturer.${index}.model`, '');
      setValue(`manufacturer.${index}.toYear`, '');
      setValue(`manufacturer.${index}.fromYear`, '');
    }
  }, [selectedManufacturer])

  useEffect(() => {
    clearErrors && clearErrors('manufacturer')
  }, [selectedFromYear, selectedToYear, selectedManufacturer])

  const fromYears = getYears({to: 1960});
  const toYears = getYears({to: selectedFromYear == 'წელი' ? 1960 : selectedFromYear});
  const moreThanOne = fields?.length > 1;

  const router = useRouter();
  
  return (
    <div className={
      clsx('w-full flex items-center justify-between',
      moreThanOne && 'border-b pb-4'
      )}>
      <div className='flex items-center gap-5'>
        {!query && <h2 className='text-base font-bold'>{index + 1}</h2>}
        <div className={style}>
          <Select style='w-[140px]' disabled={disabled}
            setSelected={(value: any) => { 
                setSelectedManufacturer(value) 
                setValue && setValue(`manufacturer.${index}.name`, value.name ? value.name : value)
                query && router.push(query('manufacturer', value.name ? value.name : value, ['model', 'toYear', 'fromYear']))
            }} selected={selectedManufacturer} data={manufacturers}/>
          <Select style='w-[140px]' disabled={disabled}
            setSelected={(value: any) => {
              setSelectedModel(value)
              setValue && setValue(`manufacturer.${index}.model`, value.name ? value.name : value)
              query && router.push(query('model', value.name ? value.name : value))
            }} selected={selectedModel} data={selectedManufacturer?.models}/>
          
          <Select style='w-[140px]' disabled={disabled}
            setSelected={(value: any) => {
              setSelectedFromYear(value)
              setValue && setValue(`manufacturer.${index}.fromYear`, value.name ? value.name : value)
              query && router.push(query('fromYear', value.name ? value.name : value))
            }} 
            selected={selectedFromYear} data={fromYears}/>
          <Select style='w-[140px]' disabled={disabled} setSelected={(value: any) => {
              setSelectedToYear(value)
              setValue && setValue(`manufacturer.${index}.toYear`, value.name ? value.name : value)
              query && router.push(query('toYear', value.name ? value.name : value))
            }} selected={selectedToYear} data={toYears}/>
        </div>
      </div>
      {moreThanOne && <Button disabled={disabled} type="button" style='py-1.5 text-[12px] px-3' text="X" color='gray' onClick={() => remove(index)}/>}
    </div>
  )
}
