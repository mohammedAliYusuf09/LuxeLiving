import { FaHouseChimney } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdBedroomChild } from "react-icons/md";
import { MdBathroom } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { SiCloudfoundry } from "react-icons/si";
import { GrStatusGood } from "react-icons/gr";
import { CgSize } from "react-icons/cg";
import type { PropertyFull } from "../lib/types";

function PropertyStatus({data} : {data : PropertyFull}) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-20 border-t border-b border-gray-500 py-10 text-gray-300">

      <div className="flex gap-2 items-center">
        <FaHouseChimney />
        <p>{data.propertyType}</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaLocationDot />
        <p>{data.location}</p>
      </div>
      <div className="flex gap-2 items-center">
        <IoPricetagsSharp />
        <p>{data.price}</p>
      </div>
      <div className="flex gap-2 items-center">
        <SlSizeFullscreen />
        <p>{data.size}</p>
      </div>
      <div className="flex gap-2 items-center">
        <MdBedroomChild />
        <p>{data.bedrooms}</p>
      </div>
      <div className="flex gap-2 items-center">
        <MdBathroom />
        <p>{data.bathrooms}</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaParking />
        <p>{data.parkingSpaces}</p>
      </div>
      <div className="flex gap-2 items-center">
        <SiCloudfoundry />
        <p>{data.yearBuilt}</p>
      </div>
      <div className="flex gap-2 items-center">
        <GrStatusGood />
        <p>{data.status}</p>
      </div>

      {
        data.lotSize && (<div className="flex gap-2 items-center">
        <CgSize />
        <p>{data?.lotSize}</p>
      </div>)
      }

    </div>
  )
}

export default PropertyStatus