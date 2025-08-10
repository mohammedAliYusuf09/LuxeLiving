import { Link } from 'react-router-dom'
import FilterButton from './FilterButton'
import { type filterProps } from '../lib/types';
interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
}

function PropertyHeader({ onChange, filter }: PropertyHeaderProps) {
return (
    <div className="flex justify-between items-center">
         <FilterButton onChange={onChange} filter={filter} />
        <Link 
        className="text-gray-200 bg-[#171717] font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-[#121212] transition-colors ease-in-out duration-200 border-2 border-white"
        to={'/propertys/add-property'} >
          Add Property
        </Link>
    </div>
  )
}

export default PropertyHeader