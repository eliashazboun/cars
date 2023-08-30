"use client";
import React,{useCallback, useEffect, useState} from 'react'


import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ShowMoreProps } from '@/types';
import { CustomButton } from '.';
import { updateSearchParams } from '@/utils';

const ShowMore = ({pageNumber, isNext}:ShowMoreProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleNavigation = useCallback (() => {
    const newLimit = (pageNumber + 1) * 8
    const newPathName = updateSearchParams("limit", `${newLimit}`)
    localStorage.setItem('persistentScroll',window.scrollY.toString())
    router.push(newPathName,{scroll:false})
  },[searchParams,pathname,router])

  useEffect(() => {
    const persistenScroll = localStorage.getItem('persistentScroll')

    if(persistenScroll === null) return

    window.scrollTo({top:Number(persistenScroll)})

    if(Number(persistenScroll) === window.scrollY)
      localStorage.removeItem('persistentScroll')

  }, [searchParams])

  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <CustomButton
          title='Show More'
          btnType='button'
          containerStyles='bg-primary-blue rounded-full text-white'
          handleClick={handleNavigation}
        />
      )}

    </div>
  )
}

export default ShowMore