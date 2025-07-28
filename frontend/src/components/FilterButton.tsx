import { FaFilter } from "react-icons/fa";
import { motion } from "motion/react";
function FilterButton() {
  return (

    <>
      <div className="flex items-center gap-1 cursor-pointer hover:text-stone-300">
          <p>Filter</p>
          <span className="text-sm"><FaFilter /></span>
      </div>
      <motion.div 
      initial={{
        position: "absulute",
        
      }}
      >


      </motion.div>

    </>
    
  )
}

export default FilterButton