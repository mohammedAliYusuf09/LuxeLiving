
import type { Client } from "@/lib/types"

function ClientsCart({client} : {client : Client}) {

  return (
    <div className="bg-[#171717] p-3 cursor-pointer"
    >
        <h2 className="text-xl font-semibold">{client.name}</h2>
        <p className="text-sm font-normal">{client.email}</p>
    </div>
  )
}

export default ClientsCart