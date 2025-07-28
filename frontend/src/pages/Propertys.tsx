import LoadingPropertyCard from "../components/LoadingPropertyCard"
import PropertyCard from "../components/PropertyCard"
import PropertyHeader from "../components/PropertyHeader"
import PropertysText from "../components/PropertysText"

export interface property {
  image: string,
  title : string,
  bedrooms: number,
  bathrooms: number,
  size: string,
  price: string,
  status: string
}

const propertyObj : property  =  {
  image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?_gl=1*dt1426*_ga*MTY0NDQyMTMzNS4xNzUyMjE2OTM1*_ga_8JE65Q40S6*czE3NTM1ODkzMzIkbzMkZzEkdDE3NTM1ODkzMzUkajU3JGwwJGgw",
  title: "$100k 2023 CONSTRUCTION IN MID COUNTRY GREENWICH",
  bedrooms: 4, 
  bathrooms: 4, 
  size: "2134 arc",
  price: "100 K",
  status: "For sale"
}


function Propertys() {
  return (
    <div>
      <PropertyHeader/>
      <PropertysText/>
      <PropertyCard propertyItem={propertyObj}/>
      <div className="mt-2">
        If loading
      </div>
      <LoadingPropertyCard/>
      
    </div>
  )
}

export default Propertys