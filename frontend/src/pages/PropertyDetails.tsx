import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { type PropertyFull } from "../lib/types";
import axios from "axios";
import { Suspense } from "react";
import PropertyData from "../components/PropertyData";
import { propertyStore } from "../store/propertyStore";

function PropertyDetails() {
  const {id} = useParams()

  const {setProperty} = propertyStore();

  const getPropertyDetails = async (): Promise<PropertyFull | string> => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`http://localhost:3000/api/v1/property/get-property-details/${id}`);
      setProperty(response.data.property)
      return response.data.property;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['propertyDetails'],
    queryFn: getPropertyDetails
  })
  

  
  
  if (error) {
    return <div className="text-center text-2xl mt-10">{(error as Error).message}</div>;
  }

  if (isPending) {
    return <h2 className="text-center text-2xl text-gray-300 mt-10">Loading ...</h2>;
  }

  if (typeof data === "object" && data !== null) {
    return (
      <Suspense fallback={<h2 className="text-center text-2xl text-gray-300 mt-10">Loading ...</h2>}>
        <PropertyData data={data as PropertyFull} />
      </Suspense>
    );
  }

  // If data is a string (error message) or undefined
  return <div className="text-2xl text-center mt-10 text-gray-200">{typeof data === "string" ? data : "No property data found."}</div>;
  
  
  
}

export default PropertyDetails