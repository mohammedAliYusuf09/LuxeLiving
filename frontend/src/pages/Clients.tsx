import ClientsCart from "@/components/ClientsCart";
import type { Client } from "@/lib/types";
import { useQuery } from "@tanstack/react-query"
import { FaMailBulk } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function Clients() {



  const getClients = async (): Promise<Client[] | string> => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `http://localhost:3000/api/v1/message/get-clients`
      );
      return response.data.clients;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

    const {data, error, isLoading} = useQuery({ 
    queryKey: ['clients'], 
    queryFn: () => getClients() })

    if (!data) {
      return (
      <>
        <div>Clients</div>
        <h2 className="text-2xl text-center">Message is not found</h2>
        {error &&  <h2 className="text-xl text-red-400 text-center">{error.message}</h2>}
      </>
      )
    }
    return (
      <>
        <div className="mb-4">Clients</div>
        {
          isLoading 
          ? 
          <h2 className="text-2xl text-center">Loading...</h2> : <div> 
            <div className="flex flex-col gap-3">
              {typeof data !== 'string' ? data?.map((item : Client)=> <ClientsCart key={item._id} client={item}/>) : <h2>{error?.message}</h2>}
            </div>
            <Link to={'/clients/sendmail'} className="absolute bottom-20 md:bottom-5 right-4 bg-[#635f5f] p-3 rounded-full cursor-pointer text-2xl hover:bg-[#5e4949]"><FaMailBulk /></Link>
          </div>
        }
      </>
    )
}

export default Clients