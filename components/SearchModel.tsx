"use client";
import { CarProps, SearchModelProps } from "@/types";
import React, { Fragment, useState } from "react";
import { manufacturers, models } from "@/constants";
import cars from "../app/cars.json";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";

interface model {
  make: string;
  models: string[];
}

const SearchModel = ({ manufacturer, model, setModel }: SearchModelProps) => {
  const [query, setQuery] = useState("");
  const allCars: Array<model> = [];
  const allModels: Array<string> = [];

  cars.map((car: CarProps) => {
    const seen = allCars.findIndex((item) => item.make === car.make);
    allModels.push(car.model);
    if (seen > 0) {
      allCars[seen].models.push(car.model);
    } else {
      allCars.push({ make: car.make, models: [car.model] });
    }
  });
  let filteredModels:Array<string> = allModels;


  const filter = (item: string) => {
    return item
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""));
  };
  
  if (manufacturer.replace(/\s+/g, "")!== ""){
    const found = allCars.find((item) => item.make === manufacturer.toLowerCase().replace(/\s+/g, ""))
    if (found){
      filteredModels = found.models
    }
  }

  filteredModels = query === "" ? filteredModels : filteredModels.filter(filter);

  return (
    <div className="search-manufacturer">
      <Combobox value={model} onChange={setModel}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src={"/model-icon.png"}
              width={25}
              height={25}
              alt="car-model"
            />
          </Combobox.Button>
          <Combobox.Input
            className="searchbar__input"
            placeholder="Model"
            displayValue={(model:string) => model}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
            className="absolute w-fit max-h-60 mt-1 overflow-auto bg-white z-20 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            static
            
            >
              {filteredModels?.length === 0 && query !=="" ? (
                <Combobox.Option
                value={query}
                className={"search-manufacturer__option"}
              >
                No result
              </Combobox.Option>

              ):(
                filteredModels?.map((item) => (
                  <Combobox.Option
                    value={item}
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      } `
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>

                ))
              )}
            </Combobox.Options>

          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchModel;
