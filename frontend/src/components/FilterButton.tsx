import { FaFilter } from "react-icons/fa";
import { motion } from "motion/react";

// interface PropertyHeaderProps {
//   onChange: (filter: filterProps) => void;
//   filter: filterProps;
// }

// function FilterButton({ onChange, filter }: PropertyHeaderProps) {
function FilterButton() {
  // const [localFilter, setLocalFilter] = useState(filter);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setLocalFilter(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleDone = () => {
  //   onChange(localFilter);
  // };

  return (
    <>
      <div className="flex items-center gap-1 cursor-pointer hover:text-stone-300">
          <p>Filter</p>
          <span className="text-sm"><FaFilter /></span>
      </div>
      <motion.div 
      className="absolute flex items-center justify-center top-[50%] left-[50%] transfrom translate-x-[-50%] translate-y-[-50%] w-screen h-screen bg-gray-600 opacity-30"
      
      >
      </motion.div>

      <motion.div
      className="absolute top-[50%] left-[50%] transfrom translate-x-[-50%] translate-y-[-50%]"
      >
        <div className=" bg-gray-800 p-4 rounded-md border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
          name="propertyType"
          // value={localFilter.propertyType} onChange={handleChange}
          className="bg-gray-800 p-3 rounded border border-gray-700"
          >
          <option value="">Property Type*</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Villa">Villa</option>
        </select>


            <input
              type="text"
              name="location"
              // value={localFilter.location} onChange={handleChange}
              placeholder="Location"
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />


            <select
              name="status"
              // value={localFilter.status} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            >
              <option value="">Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Pending">Pending</option>
            </select>
          
            {/* Bedrooms */}
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              // value={localFilter.bedrooms} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            {/* Bathrooms */}
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              // value={localFilter.bathrooms} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            <input
              type="number"
              name="min-price"
              placeholder="Min Price"
              // value={localFilter.minPrice} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            <input
              type="number"
              name="max-price"
              placeholder="Max Price"
              // value={localFilter.maxPrice} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            <button 
            // onClick={handleDone}
            className="bg-blue-600 rounded-sm cursor-pointer hover:"
            >Done</button>
          </div>
        </div>
      </motion.div>

    </>
    
  )
}

export default FilterButton