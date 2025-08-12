import { Link } from 'react-router-dom'
import FilterButton from './FilterButton'
import { type filterProps } from '../lib/types';
import type { Dispatch, SetStateAction } from 'react';
interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
  setFilters: Dispatch<SetStateAction<filterProps>>;
}

function PropertyHeader({ onChange, filter, setFilters }: PropertyHeaderProps) {
return (
    <div className="flex justify-between">
         <FilterButton onChange={onChange} filter={filter} setFilters={setFilters}/>
         <div className='mt-3'>
          <Link 
        className="text-gray-200  bg-[#171717] font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-[#121212] transition-colors ease-in-out duration-200 border-2 border-white"
        to={'/propertys/add-property'} >
          Add Property
        </Link>
         </div>
        
    </div>
  )
}

export default PropertyHeader