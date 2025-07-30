import { FaFilter } from "react-icons/fa";
import { motion } from "motion/react";
import type { filterProps } from "../pages/Propertys";
import { useState } from "react";

interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
}

function FilterButton({ onChange, filter }: PropertyHeaderProps) {

  const [isOpen, setOpen] = useState(false);

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
          value={filter.propertyType}
          onChange={e => onChange("propertyType", e.target.value as filterProps["propertyType"])}
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
              value={filter.location}
              onChange={e => onChange("location", e.target.value as filterProps["location"])}
              placeholder="Location"
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />


            <select
              name="status"
              value={filter.status} 
              onChange={e => onChange("status", e.target.value as filterProps["status"])}
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
              value={filter.bedrooms} 
              onChange={e => onChange("bedrooms", e.target.value as filterProps["bedrooms"])}
              placeholder="Bedrooms"
              // value={localFilter.bedrooms} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            {/* Bathrooms */}
            <input
              type="number"
              name="bathrooms"
              value={filter.bathrooms} 
              onChange={e => onChange("bathrooms", e.target.value as filterProps["bathrooms"])}
              placeholder="Bathrooms"
              // value={localFilter.bathrooms} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            <input
              type="number"
              name="min-price"
              value={filter.minPrice} 
              onChange={e => onChange("minPrice", e.target.value as filterProps["minPrice"])}
              placeholder="Min Price"
              // value={localFilter.minPrice} onChange={handleChange}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            />

            <input
              type="number"
              name="max-price"
              value={filter.maxPrice} 
              onChange={e => onChange("maxPrice", e.target.value as filterProps["maxPrice"])}
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