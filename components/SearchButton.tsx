import Image from "next/image"

const SearchButton = ({styles}:{styles:string}) => {
  return(

    <button type='submit' className={`-ml-3 z-10 ${styles}`}>

      <Image src={'/magnifying-glass.svg'} alt='magnifyin' width={40} height={40} className='object-contain'/>
    </button>
  )
}

export default SearchButton;