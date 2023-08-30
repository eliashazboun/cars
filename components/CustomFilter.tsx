"use client";
import React, { useState, Fragment, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomeFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, options }: CustomeFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = useCallback((e:{title:string,value:string}) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase())

    localStorage.setItem('persistentScroll',window.scrollY.toString())

    router.push(newPathName)
  },[router,searchParams,pathname])

  useEffect(() => {
    const persistentScroll = localStorage.getItem('persistentScroll')

    if(persistentScroll === null) return

    window.scrollTo({top:Number(persistentScroll)})

    if(Number(persistentScroll) === window.scrollY)
      localStorage.removeItem('persistentScroll')


  }, [searchParams])

  
  return (
    <div className="w-fit mb-10">
      <Listbox 
        value={selected} 
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
        }}
        
        >
        <div className="relative w-fit z-10">
          <Listbox.Button className={"custom-filter__btn"}>
            <span className="block truncate">{selected.title}</span>
            <Image src={"/chevron-up-down.svg"} width={20} height={20} className="ml-4 object-contain" alt="updown" />
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className={"custom-filter__options"}>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                >
                  {({ selected }) => <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.title}</span>}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
