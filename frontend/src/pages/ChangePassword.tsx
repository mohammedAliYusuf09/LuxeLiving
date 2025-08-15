import { ChackVarified } from "@/components/ChackVarified"
import { ChangePassCard } from "@/components/ChangePassCard";
import { useState } from "react";


function ChangePassword() {
    const [varified, setVarified] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        {
            !varified ? <ChackVarified setVarified={setVarified}/> : <ChangePassCard/>
        }
    </div>                                                      
  )
}

export default ChangePassword