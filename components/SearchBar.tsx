"use client";
import React,{useCallback, useEffect, useState} from 'react'
import { SearchButton, SearchManufacturer, SearchModel } from '.';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(manufacturer === '' && model ===''){
      return alert('Please fill in fields.')
    }

    updateSearchParams(model.toLowerCase(),manufacturer.toLowerCase())
  }
  const updateSearchParams = useCallback((model:string,manufacturer:string)=>{
    const currParams = searchParams.toString()
    const params = new URLSearchParams(currParams)

    if(model){
      params.set('model',model)
    }else{
      params.delete('model')
    }

    if(manufacturer){
      params.set('manufacturer',manufacturer)
    }else{
      params.delete('manufacturer')
    }

    if (currParams === params.toString()) return;

    const newPathname = `${pathname}?${params.toString()}`
    localStorage.setItem('persistentScroll',window.scrollY.toString())

    router.push(newPathname)

  },[searchParams,pathname,router])

  useEffect(() => {
    const persistentScroll = localStorage.getItem('persistentScroll')

    if(persistentScroll === null) return

    window.scrollTo({top:Number(persistentScroll)})

    if(Number(persistentScroll) === window.scrollY)
      localStorage.removeItem('persistentScroll')
      

  }, [searchParams])


  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton styles='sm:hidden'/>


      </div>
      <div className='searchbar__item'>
        <SearchModel
          manufacturer={manufacturer}
          model={model}
          setModel={setModel}
        />
     
          <SearchButton styles='sm:hidden'/>
      </div>
      <SearchButton styles='max-sm:hidden'/>

    </form>
  )
}

export default SearchBar