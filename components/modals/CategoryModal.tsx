'use client';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import { updateQueryString } from '@/utils/utils';
import { useEffect, useState } from 'react';
import Button from '../buttons/Button';

const CategoryModal = ({
  isOpen,
  onClose,
  data,
  setValue,
  setResetTechnical,
  clearErrors,
  query
}: {
  isOpen: boolean,
  onClose: () => void,
  data: any,
  setValue?: any,
  setResetTechnical?: any,
  clearErrors?: any,
  query: any
}) => {
  const router = useRouter();
  const [categories, setCategories] = useState(data);

  useEffect(() => {
    setCategories(data);
  }, [data])

  if(!data){
    return null;
  }


  const onFilter = (e: any) => {
    const { value } = e.target;
    if(value.length <= 0) return setCategories(data);
    setCategories(data?.filter((item: any) => {
      return item.name.replaceAll(" ", "").toLowerCase().includes(value.replaceAll(" ", "").toLowerCase()) || item.categoryId.replaceAll(" ", "").toLowerCase().includes(value.replaceAll(" ", "").toLowerCase())
    }))
  }

  let bodyContent = (
    <div className='grid gap-5 grid-cols-3 md:grid-cols-4'>
      {categories?.map((item: any, i: any) => 
          <Button size='sm' color='default' type='button' text={item.name} key={i} onClick={() => {
              router.push(query('category', item?.name))
              if(setValue){
                setValue('category', item?.name);
                setValue('categoryId', item?.categoryId);
                setValue('technical', undefined);
              }
              setResetTechnical && setResetTechnical(true);
              onClose();
              clearErrors && clearErrors('category');
          }}/>
        )}
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={'კატეგორია'}
      onClose={onClose}
      onFilter={onFilter}
      body={bodyContent}
    />
  );
}

export default CategoryModal;
