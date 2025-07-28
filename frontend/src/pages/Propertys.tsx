import { useEffect, useState } from "react"; // Import useState
import LoadingPropertyCard from "../components/LoadingPropertyCard";
import PropertyCard from "../components/PropertyCard";
import PropertyHeader from "../components/PropertyHeader";
import PropertysText from "../components/PropertysText";
import axios from "axios";

export interface property {
  image: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  price: string;
  status: string;
}

// You can keep this for initial development/testing if you want a default,
// but it won't be used once you fetch data.
// const propertyObj: property = {
//   image:
//     "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?_gl=1*dt1426*_ga*MTY0NDQyMTMzNS4xNzUyMjE2OTM1*_ga_8JE65Q40S6*czE3NTM1ODkzMzIkbzMkZzEkdDE3NTM1ODkzMzUkajU3JGwwJGgw",
//   title: "$100k 2023 CONSTRUCTION IN MID COUNTRY GREENWICH",
//   bedrooms: 4,
//   bathrooms: 4,
//   size: "2134 arc",
//   price: "100 K",
//   status: "For sale",
// };

function Propertys() {
  const [properties, setProperties] = useState<property[]>([]); // State to store fetched properties
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  const getProperty = async () => {
    try {
      setLoading(true); // Set loading to true before the request
      setError(null); // Clear any previous errors
      
      axios.defaults.withCredentials= true;
      
      
      const response = await axios.get('http://localhost:3000/api/v1/property/all-properties');
      // Assuming your API returns an array of property objects directly under response.data
      setProperties(response.data.data); // Adjust this based on your actual API response structure
      console.log(response.data.data); // Log the actual data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
         setError(error.response?.data?.message || error.message)
      } else if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setError(error.message);
      } else {
        console.error("Login failed:", error);
        setError("Unknown Error apiar : Login failed")
      }
    }finally {
      setLoading(false); // Set loading to false after the request (success or failure)
    }
  };

  useEffect(() => {
    getProperty();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <PropertyHeader />
      <PropertysText />

      {/* Conditional rendering based on loading, error, and data */}
      {loading ? (
        <LoadingPropertyCard />
      ) : error ? (
        <div className="text-red-500 mt-4 text-center">{error}</div>
      ) : properties.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {properties.map((propertyItem) => (
            <PropertyCard key={propertyItem.title + propertyItem.price} propertyItem={propertyItem} />
            // You might need a more unique key if title+price isn't guaranteed unique
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-600">No properties found.</div>
      )}

      {/* You can remove these if you're using the conditional rendering above */}
      {/* <PropertyCard propertyItem={propertyObj} /> */}
      {/* <div className="mt-2">If loading</div> */}
      {/* <LoadingPropertyCard /> */}
    </div>
  );
}

export default Propertys;