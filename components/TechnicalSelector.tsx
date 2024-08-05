import React, { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { appendQueryString, updateQueryJson, updateQueryString } from '@/utils/utils';
import Select from '@/components/selects/Select';

export default function TechnicalSelector({
  technical,
  setValue,
  clearErrors,
  disabled,
  isReseted,
  setReseted,
  grid,
  query
}: {
  setValue?: any,
  clearErrors?: any,
  disabled?: boolean,
  technical?: any,
  isReseted: boolean,
  setReseted?: any,
  grid?: 2 | undefined,
  query?: boolean,
}) {
  return (
    <div className={clsx('grid gap-5',
      grid === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4'
    )}>
        {Object.keys(technical)?.map((tech: any, i: any) =>
                <ObjectKeys query={query} setReseted={setReseted} isReseted={isReseted} clearErrors={clearErrors} disabled={disabled} key={i} setValue={setValue} tech={tech} technical={technical}/>
            )
        }
    </div>
  )
}


const ObjectKeys = ({setValue, tech, disabled, technical, clearErrors, setReseted, isReseted, query}: any) => {
  const searchParams = useSearchParams();
  const prev = searchParams?.get('technical');
  const JsonPrev = prev ? JSON.parse(prev) : undefined;
  const [selectedTechnical, setSelectedTechnical] = useState(JsonPrev?.[tech]);

  useEffect(() => {
    if(isReseted){
      setReseted(false);
      setSelectedTechnical(undefined);
    }
  }, [isReseted])

  useEffect(() => {
    clearErrors && clearErrors('technical');
  }, [selectedTechnical])
  const router = useRouter();

  return query 
  ? <Select disabled={disabled} selected={selectedTechnical || technical[tech].title} setSelected={(value: any) => {
      router.push(updateQueryJson('technical', JSON.stringify({[tech] : value})))
      setSelectedTechnical(value);
    }} data={technical[tech]?.values}/> 
  : <Select disabled={disabled} selected={selectedTechnical || technical[tech].title} setSelected={(value: any) => {
      setValue(`technical.${tech}`, value);
      setSelectedTechnical(value);
    }} data={technical[tech]?.values}/>
}
