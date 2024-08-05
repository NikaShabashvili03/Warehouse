'use client'
import CategoryModal from '@/components/modals/CategoryModal';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Form from '@/components/forms/Form';
import Button from '@/components/buttons/Button';
import Loading from '@/components/loading/Loading';
import Radio from '@/components/inputs/Radio';
import Input from '@/components/inputs/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { removeAllQueryString, removeManyAndUpdateQueryString, updateManyQueryString, updateOneRemoveMany, updateQueryString } from '@/utils/utils';
import { allCategoriesProps, allManufacturersProps } from '@/types';
import TechnicalSelector from '@/components/TechnicalSelector';
import ModelSelector from '@/components/ModelSelector';

interface SearchPartProps {
  categories: allCategoriesProps[] | undefined,
  technical: any,
  manufacturers: allManufacturersProps[]
}

export default function SearchPart({
  categories,
  technical,
  manufacturers
}: SearchPartProps) {
  const searchParams = useSearchParams();
  const searchCategory = searchParams?.get('category') || undefined;
  const searchCondition = searchParams?.get('condition') || undefined;
  const searchLessPrice = searchParams?.get('lessPrice') || undefined;
  const searchMorePrice = searchParams?.get('morePrice') || undefined;
  const [isResetedTechnical, setResetTechnical] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const router = useRouter();

  return (
    <div className='w-full bg-white rounded-lg'>
      {categoryModal && <CategoryModal query={removeManyAndUpdateQueryString} setResetTechnical={setResetTechnical} data={categories} isOpen={categoryModal} onClose={() => setCategoryModal(false)}/>}
      <div className='w-full flex flex-col relative gap-5 p-5'>
          <div className='flex justify-between ml-1 border-b pb-2 items-center'>
            <span className='font-bold text-lg'>კატეგორია</span>
            <button onClick={() => {
              router.push(removeAllQueryString())
              setResetTechnical(true);
              setCategoryModal(false);
            }} className='text-gray-400'>ფილტრის გასუფთავება</button>
          </div>
          <Button
                // disabled={loading}
                type='button'
                style={'w-full'}
                text={searchCategory || 'კატეგორია'}
                onClick={() => {
                  setCategoryModal(true);
                }}
                color='default'
                size='2/4'
                icon='/icons/dropdown.svg'
                iconSize={25}
          />
          {searchCategory &&
            <div className='flex flex-col gap-5'>
              <span className='font-bold text-lg ml-1 border-b pb-2'>ტექნიკური მახასიათებლები</span>
              {technical?.technical && <TechnicalSelector 
                    // disabled={loading}
                    query 
                    grid={2} 
                    setReseted={setResetTechnical} 
                    isReseted={isResetedTechnical} 
                    technical={technical?.technical}
              />}
              <span className='font-bold text-lg -mb-5 ml-1 border-b pb-2'>მდგომარეობა</span>
              <Radio style='sm:w-2/4 lg:w-full grid grid-cols-3 gap-5' defaultValue={searchCondition} query id='condition' variants={[
                          {text: 'ყველა', value: ''},
                          {text: 'ახალი', value: 'New'},
                          {text: 'მეორადი', value: 'Secondary'}
              ]} />
              <span className='font-bold text-lg ml-1 border-b pb-2'>მოდელები</span>
              <ModelSelector style='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3' query={updateOneRemoveMany} index={0} manufacturers={manufacturers}/>
            </div>
          }
          <span className='font-bold text-lg ml-2 border-b pb-2'>ფასი</span>
          <div className='grid grid-cols-3 gap-2 sm:w-2/4 lg:w-full'>
            <Input defaultValue={searchMorePrice} query size='sm' placeholder='დან' type='number' price id='morePrice' step='0.01' min={0}/>
            <span className='flex justify-center items-center font-bold text-lg'>-</span>
            <Input defaultValue={searchLessPrice} query size='sm' placeholder='მდე' type='number' price id='lessPrice' step='0.01' min={0}/>
          </div>
      </div>
    </div>
  )
}
