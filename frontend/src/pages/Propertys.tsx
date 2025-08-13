import LoadingPropertyCard from "../components/LoadingPropertyCard";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type property } from "../lib/types";
import { type filterProps } from "../lib/types";
import { Link } from "react-router-dom";
import FilterButton from "@/components/FilterButton";



function Propertys() {


  const [filters, setFilters] = useState<filterProps>({
    propertyType: '',
    location: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
  });
  

  const handleOnChange = <K extends keyof filterProps>(key: K, value: filterProps[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  interface GetPropertyByQuireResponse {
    data: property[];
  }

  const getPropertyByQuire = async (filters : filterProps): Promise<property[] | string> => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get<GetPropertyByQuireResponse>(
        `http://localhost:3000/api/v1/property/all-properties?propertyType=${filters.propertyType}&location=${filters.location}&status=${filters.status}&bedrooms=${filters.bedrooms}&bathrooms=${filters.bathrooms}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`
      );
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

   const {data, error, isLoading} = useQuery({ 
    queryKey: ['propertys', filters], 
    queryFn: () => getPropertyByQuire(filters) })


  return (
    <div className="overflow-hidden">
      <div className="flex justify-between">
        <FilterButton
          onChange={handleOnChange}
          filter={filters}
          setFilters={setFilters}
        />
        <div className="flex items-start justify-start">
          <Link
            className="text-gray-200  bg-[#171717] font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-[#121212] transition-colors ease-in-out duration-200 border-2 border-white"
            to={"/propertys/add-property"}
          >
            Add Property
          </Link>
        </div>
      </div>

      {/* Conditional rendering based on loading, error, and data */}
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-4">
          <LoadingPropertyCard />
          <LoadingPropertyCard />
          <LoadingPropertyCard />
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4 text-center">
          {error ? error.toString() : "An error occurred."}
        </div>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {data.map((propertyItem: property) => (
            <PropertyCard key={propertyItem._id} propertyItem={propertyItem} />
            // You might need a more unique key if title+price isn't guaranteed unique
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-600">
          No properties found.
        </div>
      )}
    </div>
  );
}

export default Propertys;