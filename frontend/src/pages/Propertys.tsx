import { useCallback, useEffect, useState } from "react"; 
import LoadingPropertyCard from "../components/LoadingPropertyCard";
import PropertyCard from "../components/PropertyCard";
import PropertyHeader from "../components/PropertyHeader";
import PropertysText from "../components/PropertysText";
import axios from "axios";

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
  const [properties, setProperties] = useState<property[]>([]); // State to store fetched properties
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  const [filter, setFilter] = useState<filterProps>({
  propertyType: "",
  location: "",
  status: "",
  bedrooms: "",
  bathrooms: "",
  minPrice: "",
  maxPrice: ""
  });

   const getProperty = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      axios.defaults.withCredentials = true;
      const response = await axios.get(`http://localhost:3000/api/v1/property/all-properties`,
        {
        params: filter,
        }
      );

      setProperties(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setError(error.message);
      } else {
        console.error("Login failed:", error);
        setError("Unknown Error occurred: Login failed");
      }
    } finally {
      setLoading(false);
    }
  }, [filter]); // Dependency: `filter`

  // Update the search params

  useEffect(() => {
    getProperty();
  },[getProperty]); // Empty dependency array means this runs once on mount

  return (
    <div>
      <PropertyHeader filter={filter} onChange={setFilter}/>
      <PropertysText />

      {/* Conditional rendering based on loading, error, and data */}
      {loading ? (
        <div className="flex flex-col gap-4 mt-4"> 
        <LoadingPropertyCard />
        <LoadingPropertyCard />
        <LoadingPropertyCard />
        </div>
        
      ) : error ? (
        <div className="text-red-500 mt-4 text-center">{error}</div>
      ) : properties.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {properties.map((propertyItem) => (
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