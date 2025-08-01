import { Link } from 'react-router-dom'
import FilterButton from './FilterButton'
import { type filterProps } from '../lib/utils';
interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
}

function PropertyHeader({ onChange, filter }: PropertyHeaderProps) {
return (
    <div className="flex justify-between items-center">
         <FilterButton onChange={onChange} filter={filter} />
        <Link 
        className="text-gray-800 font-semibold bg-white px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors ease-in-out duration-200"
        to={'/propertys/add-property'} >
          Add Property
        </Link>
    </div>
  )
}

export default PropertyHeader