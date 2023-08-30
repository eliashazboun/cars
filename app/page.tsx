"use client";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, manufacturers, yearsOfProduction } from '@/constants'
import { fetchCars } from '@/utils'

export default function Home({searchParams}:{searchParams:any}) {
  const allCars =  fetchCars({
    manufacturer: searchParams.manufacturer || '',
    fuel: searchParams.fuel || '',
    model: searchParams.model || '',
    limit: searchParams.limit || 8
  })
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catologue</h1>
          <p>Explore cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar/>
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels}/>
          </div>
        </div>
        {isDataEmpty === false ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) =>(
                <CarCard car={car}/>))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 8) / 8}
              isNext={(searchParams.limit || 8) > allCars.length}
            />
          </section>
        ): (
          <div className='home__eror-container'>
            <h2 className='text-black text-xl font-bold'>No results</h2>
          </div>
        )}
      </div>
     
    </main>
  )
}
