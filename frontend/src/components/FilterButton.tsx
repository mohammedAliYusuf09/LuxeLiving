import { FaFilter } from "react-icons/fa";
import {  motion  } from "motion/react";
import { useState } from "react";
import { type filterProps } from "../lib/types";

interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
}


function FilterButton({ onChange, filter }: PropertyHeaderProps) {


  const [isOpen, setOpen] = useState(false);

  const handelFilterClick = () => {
    setOpen(true)
    console.log("hello filter clicked", isOpen);
  }

  return (
    <div>
      <div className="flex items-center gap-1 cursor-pointer hover:text-stone-300"
      onClick={handelFilterClick}
      >
          <p>Filter</p>
          <span className="text-sm"><FaFilter /></span>
      </div>

      <motion.div
        initial={{ y: -600, opacity: 0 }}
        animate={isOpen ? { y: 0, opacity: 1 } : { y: -600, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="absolute z-50 bg-gray-800 p-4 rounded-md border border-gray-300 top-16 left-1/2 transform -translate-x-1/2"
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
            onClick={() => setOpen(false)}
            >Close</button>
          </div>
        </div>
      </motion.div>

    </div>
    
  )
}

export default FilterButton