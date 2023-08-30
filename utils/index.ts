import { CarProps, FilterProps } from "@/types";
import { error } from "console";
import cars from "../app/cars.json";

export function fetchCars(filters: FilterProps) {
  const { fuel, manufacturer, model,limit } = filters;

  let filtered = cars;

  if (fuel === "" && manufacturer === "" && model === "") {
    return filtered.slice(0,limit);
  }

  if (fuel !== "") {
    filtered = filtered.filter((item) => item.fuel_type === fuel);
  }

  if (manufacturer !== "") {
    filtered = filtered.filter((item) => item.make === manufacturer);
  }

  if (model !== "") {
    filtered = filtered.filter((item) => item.model === model);
  }
  const slicedArray = filtered.slice(0,limit)

  return slicedArray;
}

export const calculateCarRent = (city_mpg: number, year: number, transmission: string) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.9;
  const ageFactor = 0.2;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const transmissionRate = transmission === "m" ? -10 : 0;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate + transmissionRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps) => {
  const { make, model } = car;
  const picture = `/png/${make.toLowerCase()}${model.toLowerCase()}.png`.replace(/\s/g, "");
  return picture;
};

export const updateSearchParams = (type:string, value:string) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(type, value)
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname
}
