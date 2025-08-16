import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { notifyError, notifySuccess } from "@/lib/tostCollection"
import type { Email } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SendMail() {
  const navigate = useNavigate();
  // create a use state and get input and textarea value on change
  const [mail, setMail] = useState<Email>({
    subject: '',
    message: ''
  })

  // handelOnChange
  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMail(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const sendMail = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `http://localhost:3000/api/v1/message/send-mail-toall`,
      mail
    );
    return response.data;
  }

  const queryClient = useQueryClient();
   
  const { mutate } = useMutation({
      mutationFn: sendMail,
      onSuccess: (responseData) => {
        // Optionally refetch or update query cache
        queryClient.invalidateQueries({ queryKey: ["sendMail"] });
        setMail({
        subject: "",
        message: ""
      })
      // notify(responseData.message);
      notifySuccess(responseData.message);
      navigate(-1);
      },
      onError: (error:AxiosError) => {
        console.log("Blog could not be Added");
        // notify(error.message || "An error occurred");
        notifyError(error.message || "An error occurred");
      },
  });
  
  return (
    <>
        <div className="font-semibold">Send mail to all clients</div>
        <div className="flex flex-col gap-4 py-6">
            <Input 
            type="text"
            name="subject"
            value={mail.subject}
            placeholder="Subject"
            onChange={handelOnChange}
            />

            <Textarea 
            className="min-h-32"
            name="message"
            value={mail.message}
            placeholder="Email body.."
            onChange={handelOnChange}
            />

            <div className="flex gap-4">
                <Button
                variant={'outline'}
                className="bg-white hover:text-bg-black hover:border-white text-black hover:bg-gray-200 cursor-pointer"
                onClick={() => mutate()}
                >Send</Button>
                <Button
                variant={'outline'}
                className="hover:bg-white hover:text-black cursor-pointer"
                onClick={() => navigate(-1)}
                >Cansel</Button>
            </div>
        </div>
    </>
  )
}

export default SendMail