import { Link } from "react-router-dom"

function Propertys() {
  return (
    <div>
      <div className="flex justify-between">
        <h5 className="text-white font-semibold">Propertyes</h5>
        <Link 
        className="text-gray-800 font-semibold bg-white px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors ease-in-out duration-200"
        to={'/propertys/add-property'} >
          Add Property
        </Link>
      </div>
    </div>
  )
}

export default Propertys