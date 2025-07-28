import { FaFilter } from "react-icons/fa";
function FilterButton() {
  return (
    <div className="flex items-center gap-1 cursor-pointer hover:text-stone-300">
        <p>Filter</p>
        <span className="text-sm"><FaFilter /></span>
    </div>
  )
}

export default FilterButton