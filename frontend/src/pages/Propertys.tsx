import LoadingPropertyCard from "../components/LoadingPropertyCard";
import PropertyCard from "../components/PropertyCard";
import PropertyHeader from "../components/PropertyHeader";
import PropertysText from "../components/PropertysText";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface property {
  _id: string,
  images: [string];
  title: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  price: string;
  status: string;
}

export interface filterProps {
  propertyType : string,
  location: string,
  status: string,
  bedrooms: string,
  bathrooms: string,
  minPrice: string,
  maxPrice: string,
}

function Propertys() {


  const getPropertyByQuire = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`http://localhost:3000/api/v1/property/all-properties`);
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  }

   const {data, error, isLoading} = useQuery({ queryKey: ['propertys'], queryFn: getPropertyByQuire })



  return (
    <div>
      <PropertyHeader />
      {/* <PropertyHeader filter={filter} onChange={setFilter}/> */}
      <PropertysText />

      {/* Conditional rendering based on loading, error, and data */}
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-4"> 
        <LoadingPropertyCard />
        <LoadingPropertyCard />
        <LoadingPropertyCard />
        </div>
        
      ) : error ? (
        <div className="text-red-500 mt-4 text-center">{error ? error.toString() : "An error occurred."}</div>
      ) : data.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {data.map((propertyItem: property) => (
            <PropertyCard key={propertyItem._id} propertyItem={propertyItem} />
            // You might need a more unique key if title+price isn't guaranteed unique
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-600">No properties found.</div>
      )}
    </div>
  );
}

export default Propertys;