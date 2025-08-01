import type { PropertyFull } from "../lib/utils"
import ImageGallery from "./ImageGallery";
import PropertyDescription from "./PropertyDescription";
import PropertyStatus from "./PropertyStatus";




function PropertyData({data} : {data : PropertyFull}) {

  console.log(data);
  

  return (
    <>
    <h2 className="text-2xl font-semibold">{data.title}</h2>
    <p className="text-lg font-normal my-4">{data.summary}</p>
    <ImageGallery images={data.images}/>
    <PropertyStatus data={data}/>

    <PropertyDescription description={data.description}/>


    
    </>
  )
}

export default PropertyData