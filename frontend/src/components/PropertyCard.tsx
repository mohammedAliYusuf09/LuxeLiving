import { useNavigate } from "react-router-dom";
import { type property } from "../lib/utils";
import { FaDeleteLeft } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function PropertyCard({ propertyItem }: { propertyItem: property }) {


  const deleteProperty = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `http://localhost:3000/api/v1/property/delete-property/${propertyItem._id}`
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      // Optionally refetch or update query cache
      queryClient.invalidateQueries({ queryKey: ["propertys"] });
    },
    onError: () => {
      console.log("Property Could not be deleted");
    },
  });

  const navigate = useNavigate();

  const handelCardClidk = () => {
    navigate(`/propertys/${propertyItem._id}`);
  };

  return (
        <div className="max-h-48 flex items-center gap-6 bg-[#21222D] p-2 rounded-md relative">
            <div className="w-48 h-36 rounded-md cursor-pointer">
                <img
                    className="w-full h-full rounded-md hover:scale-105 transition-all ease duration-100"
                    src={propertyItem.images[0]}
                    alt={propertyItem.title}
                    onClick={handelCardClidk}
                />
            </div>
        
        <div className="flex flex-col gap-1">
            <h5
            className="text-xl font-medium cursor-pointer hover:text-blue-300  hover:underline"
            onClick={handelCardClidk}
            >
            {propertyItem.title}
            </h5>
            <div className="flex items-center gap-2">
            <p className="text-lg font-normal">
                {propertyItem.bathrooms} bedrooms
            </p>
            <p className="text-lg font-normal">
                {propertyItem.bathrooms} bathrooms
            </p>
            <p className="text-lg font-normal">{propertyItem.size} </p>
            </div>
            <div className="flex items-center gap-2">
            <p className="text-lg font-normal">{propertyItem.price}</p>
            <p className="text-lg font-normal">{propertyItem.status}</p>
            </div>
        </div>
        <span
            className="absolute bottom-2 right-2 cursor-pointer hover:text-red-400 text-2xl"
            onClick={() => mutate()}
        >
            <FaDeleteLeft />
        </span>
        </div>
  );
}

export default PropertyCard;
