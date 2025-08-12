import { Link } from "react-router-dom";
import type { PropertyFull } from "../lib/types"
import ImageGallery from "./ImageGallery";
import PropertyDescription from "./PropertyDescription";
import PropertyStatus from "./PropertyStatus";


function PropertyData({data} : {data : PropertyFull}) {

  return (
    <>
    <div className="flex justify-end">
    <Link 
    className="text-gray-200 bg-[#171717] font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-[#121212] transition-colors ease-in-out duration-200 border-2 border-white"
    to={`/propertys/edit-property/${data._id}`} >
      Edit Property
    </Link>
    </div>
    <h2 className="text-2xl font-semibold mt-4">{data.title}</h2>
    <p className="text-lg font-normal my-4">{data.summary}</p>
    <ImageGallery images={data.images}/>
    <PropertyStatus data={data}/>
    <PropertyDescription description={data.description}/>
    </>
  )
}

export default PropertyData