import { useNavigate } from "react-router-dom";
import { type property } from "../lib/types";
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
    <div className="flex flex-col sm:flex-row gap-4 sm:h-80 bg-[#171717] sm:items-center p-4"
    >
      {/* // image */}
      <div className="sm:h-full sm:w-[40%]">
        <img
          className="sm:h-full sm:w-full object-cover hover:scale-105 cursor-pointer transition-all ease-in-out duration-200"
          src={propertyItem.images[0]}
          alt={propertyItem.title}
          onClick={handelCardClidk}
        />
      </div>

      {/* contents */}
      <div className="sm:w-[60%] flex flex-col gap-2 md:gap-4">
        {/* title */}
        <h4 className="text-2xl leading-7 md:text-3xl md:leading-10 xl:text-4xl xl:leading-15 font-bold  cursor-pointer hover:underline transition-all ease-in-out duration-200"
        onClick={handelCardClidk}
        >
          {propertyItem.title}
          </h4>
        {/* features */}
        <div className="flex gap-2 text-lg md:text-xl xl:text-2xl">
          <p className="font-semi-bold">
            {propertyItem.bathrooms} bedrooms
          </p>
          <p className="font-semi-bold">
            {propertyItem.bathrooms} bathrooms
          </p>
          <p className="font-semi-bold">{propertyItem.size} </p>
        </div>
        {/* price & lable */}
        <div className="flex gap-2 text-lg md:text-xl xl:text-2xl">
          <p className="font-semi-bold">${propertyItem.price}</p>
          <p className="font-normal bg-[#262626] px-2 rounded-lg">{propertyItem.status}</p>
          <p className="text-lg font-normal bg-[#262626] px-2 rounded-lg text-red-400 cursor-pointer hover:text-red-800 transition-colors ease-in-out duration-150"
          onClick={() => mutate()}
          >delete</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;


{/* <div className="max-h-48 flex items-center gap-6 bg-[#21222D] p-2 rounded-md relative">
            <div className="w-48 h-36 rounded-md cursor-pointer">
                <img
                    className="w-full h-full rounded-md object-cover hover:scale-105 transition-all ease duration-100"
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
        </div> */}
