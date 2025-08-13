import { FaFilter } from "react-icons/fa";
import { useState, type Dispatch, type SetStateAction } from "react";
import { type filterProps } from "../lib/types";

interface PropertyHeaderProps {
  onChange: <K extends keyof filterProps>(key: K, value: filterProps[K]) => void;
  filter: filterProps;
  setFilters: Dispatch<SetStateAction<filterProps>>;
}


function FilterButton({ onChange, filter, setFilters }: PropertyHeaderProps) {


  const [isOpen, setOpen] = useState(false);

  const handelFilterClick = () => {
    setOpen(true)
    console.log("hello filter clicked", isOpen);
  }

  const calselFilter = () => {
    setFilters({
    propertyType: '',
    location: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
  })
    setOpen(false)
  }

  return (
    <div>
      <div className="flex mt-1 items-center gap-1 cursor-pointer hover:text-stone-300"
      onClick={handelFilterClick}
      >
          <p className="text-xl xl:text-2xl">Filter</p>
          <span className="text-sm"><FaFilter /></span>
      </div>

      {
        isOpen && <div
        className="mt-6"
      >
        <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
          <select
          name="propertyType"
          value={filter.propertyType}
          onChange={e => onChange("propertyType", e.target.value as filterProps["propertyType"])}
          className="input-style-filter"
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
              className="input-style-filter"
            />

            <select
              name="status"
              value={filter.status} 
              onChange={e => onChange("status", e.target.value as filterProps["status"])}
              className="input-style-filter"
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
              className="input-style-filter"
            />

            {/* Bathrooms */}
            <input
              type="number"
              name="bathrooms"
              value={filter.bathrooms} 
              onChange={e => onChange("bathrooms", e.target.value as filterProps["bathrooms"])}
              placeholder="Bathrooms"
              // value={localFilter.bathrooms} onChange={handleChange}
              className="input-style-filter"
            />

            <input
              type="number"
              name="min-price"
              value={filter.minPrice} 
              onChange={e => onChange("minPrice", e.target.value as filterProps["minPrice"])}
              placeholder="Min Price"
              // value={localFilter.minPrice} onChange={handleChange}
              className="input-style-filter"
            />

            <input
              type="number"
              name="max-price"
              value={filter.maxPrice} 
              onChange={e => onChange("maxPrice", e.target.value as filterProps["maxPrice"])}
              placeholder="Max Price"
              // value={localFilter.maxPrice} onChange={handleChange}
              className="input-style-filter"
            />

            <button 
            // onClick={handleDone}
            className="bg-[#262626] rounded-sm cursor-pointer hover:"
            onClick={calselFilter}
            >Clear</button>
          </div>
        </div>
      </div>
      }

      

    </div>
    
  )
}

export default FilterButton