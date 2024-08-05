"use client"
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import Textarea from '@/components/inputs/Textarea';
import Form from '@/components/forms/Form';
import FormSection from '@/components/forms/FormSection';
import Radio from '@/components/inputs/Radio';
import Button from '@/components/buttons/Button';
import axios from 'axios';
import { allCategoriesProps, allManufacturersProps } from '@/types';
import Progress from '../../../../../components/Progress';
import toast from 'react-hot-toast';
import CategoryModal from '../../../../../components/modals/CategoryModal';
import Loading from '../../../../../components/loading/Loading';
import { updateQueryString } from '@/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import TechnicalSelector from '@/components/TechnicalSelector';
import ModelSelector from '@/components/ModelSelector';



interface AddClientProps {
  manufacturers: allManufacturersProps[],
  categories: allCategoriesProps[] | undefined,
  type: 'Part' | 'Disc',
  technical: any,
  title: string
}
export default function CreatePart({
  manufacturers,
  categories,
  type,
  technical,
  title,
}: AddClientProps) {
  const { 
    register,
    handleSubmit,
    watch,
    control,
    clearErrors,
    setValue,
    reset,
    setError,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
            defaultValues: {
                // Info
                price: '',
                name: '',
                description: '',
                // Category
                category: '',
                categoryId: '',
                technical: undefined,
                // More
                condition: '',
                original: undefined,
                // Manufacturer
                manufacturer: [{
                  name: '',
                  model: '',
                  fromYear: '',
                  toYear: '',
                }],
            },
            criteriaMode: 'all',
  });
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "manufacturer",
  });

  const allFields = watch();
  const [loading, setLoading] = useState(false);
  const [resetTechnical, setResetTechnical] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const searchParams = useSearchParams();
  const searchCategory = searchParams?.get('category');
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
      if(!data.category) return setError('category', {})
      if(!data.technical) return setError('technical', {})
      if(!data.manufacturer[0].name) return setError('manufacturer.[0].name', {});
      if(!data.manufacturer[0].toYear) return setError('manufacturer.[0].toYear', {});
      if(!data.manufacturer[0].toYear) return setError('manufacturer.[0].fromYear', {});
      
      setLoading(true)
      axios.post('/api/part/create', {
        name: data.name,
        description: data.description,
        price: data.price,
        condition: data.condition,
        manufacturer: data.manufacturer,
        original: data.original,
        categoryName: data.category,
        categoryId: data.categoryId,
        technical: data.technical,
        type: type,
      }).then(() => {
        toast.success("Part has been created")
        setLoading(false);
        router.refresh();
        reset()
      }).catch((err) => {
        toast.error("Something went wrong")
        setLoading(false);
      })
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 1300);
  }, [searchCategory])

  return (
    <div className='flex flex-col gap-5 lg:flex-row bg-[#f8f9fc] min-h-dvh justify-center items-start'>
      {loading && <Loading/>}
      {categoryModal && <CategoryModal query={updateQueryString} clearErrors={clearErrors} setValue={setValue} setResetTechnical={setResetTechnical} data={categories} isOpen={categoryModal} onClose={() => setCategoryModal(false)}/>}
      <div className='w-full relative mt-0 mb-24 mr-10 lg:mb-0 lg:mt-0 lg:w-1/4 h-full'>
        <Progress title={title} errors={errors} fields={allFields}/>
      </div>
      <Form style='lg:w-2/4' onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <FormSection position='vertical' error={errors.condition || errors.category} title='ახალი პროდუქტის დამატება'>
                <Button
                  disabled={loading}
                  type='button'
                  text={allFields.category || 'კატეგორია'}
                  onClick={() => {
                    setCategoryModal(true);
                  }}
                  color='default'
                  size='2/4'
                  icon='/icons/dropdown.svg'
                  iconSize={25}
                />
                 <div>
                </div>
                <Radio style="flex gap-3 w-2/6" disabled={loading} title="მდგომარეობა" register={register} id='condition' variants={[
                  {
                    text: 'ახალი',
                    value: "New"
                  },
                  {
                    text: 'მეორადი',
                    value: "Secondary"
                  }
                ]} required/>

                <Radio style='flex gap-3 w-2/6' disabled={loading} title="ორიგინალი" register={register} id='original' variants={[
                  {
                    text: 'კი',
                    value: true
                  },
                  {
                    text: 'არა',
                    value: false
                  }
                ]}/>
          </FormSection>
          {/* Description */}
          <FormSection position='vertical' error={errors.name || errors.price || errors.description} title='აღწერა და სურათები'>
                <Input min={1} step="0.01" disabled={loading} id={'price'} register={register} type='number' placeholder='0.00' title='პროდუქტის ფასი' price required/>
                <Input disabled={loading} id={'name'} register={register} type='text' placeholder='' title='პროდუქტის სახელი' required/>
                <Textarea disabled={loading} id={'description'} register={register} title='პროდუქტის აღწერა' required/>
          </FormSection>
          {allFields?.category && 
            <>
              {/* Technical Characteristics */}
              <FormSection position='vertical' error={errors.technical} title="ტექნიკური მახასიათებლები">
                {technical?.technical && <TechnicalSelector setReseted={setResetTechnical} isReseted={resetTechnical} disabled={loading} clearErrors={clearErrors} setValue={setValue} technical={technical?.technical}/>}
              </FormSection>
              {/* Models */}
              <FormSection position='vertical' error={errors.manufacturer} title="მოდელები">
                <div className='flex flex-col gap-5'>
                  {fields?.map((_: any, index: any) => 
                    <ModelSelector style='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4 gap-5' disabled={loading} clearErrors={clearErrors} fields={fields} index={index} key={index} remove={remove} setValue={setValue} manufacturers={manufacturers}/>
                  )}
                </div>
                <Button style="ml-7" color='sky' disabled={loading} onClick={() => {append({name: '', model: '', fromYear: '', toYear: ''})}} type='button' size='sm' text='+ დაამატე მოდელი'/>
              </FormSection>
            </>
          }
          {/* Form Submit */}
          <FormSection position="horizontal" itemsPosition={"between"}>
            <h2 className='font-bold text-xl'>{!allFields.price ? 0 : Math.abs(allFields.price.toFixed(2))} ₾</h2>
            <Button size='lg' disabled={loading} type="submit" color='sky' text='განცხადების დამატება'/>
          </FormSection>
          <br/>
      </Form>
    </div>
  )
}
