import type { property } from "../pages/Propertys";

function PropertyCard({ propertyItem }: { propertyItem: property }) {    
    return (
        <div className="max-h-48 flex items-center gap-6 bg-[#21222D] p-2 rounded-md">
            <img className="w-48 rounded-md" src={propertyItem.images[0]} alt={propertyItem.title} />
            <div className="flex flex-col gap-1">
                <h5 className="text-xl font-medium">{propertyItem.title}</h5>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-normal">{propertyItem.bathrooms} bedrooms</p>
                    <p className="text-lg font-normal">{propertyItem.bathrooms} bathrooms</p>
                    <p className="text-lg font-normal">{propertyItem.size} </p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-normal">{propertyItem.price}</p>
                    <p className="text-lg font-normal">{propertyItem.status}</p>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard