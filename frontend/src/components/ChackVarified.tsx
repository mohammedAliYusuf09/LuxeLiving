import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { notifyError, notifySuccess } from "@/lib/tostCollection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { TfiClose } from "react-icons/tfi"
import { useNavigate } from "react-router-dom";

interface setCarified {
    setVarified: React.Dispatch<React.SetStateAction<boolean>>
}


export function ChackVarified({setVarified}: setCarified) {
    const navigate = useNavigate();
    const [mailSend, setMailSend] = useState(false);
    const [otp, setOtp] = useState('');

    const sendOTP = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://localhost:3000/api/v1/agent/send-otp`
        );
        return response.data;
      }

    const validateOTP = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://localhost:3000/api/v1/agent/validate-otp`, 
          { otp }
        );
        setVarified(true);
        return response.data;
    }
    
      const queryClient = useQueryClient();
       
      const { mutate : sendOtp } = useMutation({
          mutationFn: sendOTP,
          onSuccess: (responseData) => {
            // Optionally refetch or update query cache
            queryClient.invalidateQueries({ queryKey: ["sendOtp"] });
            setMailSend(true);
          // notify(responseData.message);
          notifySuccess(responseData.message);
          },
          onError: (error:AxiosError) => {
            console.log("Blog could not be Added");
            notifyError(error.message || "An error occurred");
          },

      });

      const { mutate: varifyOTP } = useMutation({
          mutationFn: validateOTP,
          onSuccess: (responseData) => {
            // Optionally refetch or update query cache
            queryClient.invalidateQueries({ queryKey: ["varifyOtp"] });
            // notify(responseData.message);
            notifySuccess(responseData.message);
          },
          onError: (error:AxiosError) => {
            // notify(error.message || "An error occurred");
            notifyError(error.message || "An error occurred");
          },
      });

      const handleOtpChange = (e: React.FormEvent) => {
        e.preventDefault();
        varifyOTP();
      };


  return (
    <Card className="w-full max-w-sm bg-[#171717]">
      <CardHeader>
        <CardTitle>Varify yourself</CardTitle>
        <CardDescription>
          Let us varify if you are authorized to reset your authontication
          informations. An OTP will be send on your email.
        </CardDescription>
        <CardAction>
          <span className="text-white text-lg" onClick={() => navigate(-1)}>
            <TfiClose />
          </span>
        </CardAction>

        <div>
          <Button
            className="bg-[#4e4c4c] hover:bg-[#504444] transition-colors ease-in duration-200"
            variant={"outline"}
            onClick={() => sendOtp()}
          >
            Send
          </Button>
        </div>
      </CardHeader>
      {mailSend && (
        <CardFooter className="flex-col gap-2 items-start">
          <form className="flex flex-col gap-2 w-full">
            <label htmlFor="opt">OTP</label>
            <Input 
            placeholder="OTP" 
            id="opt" 
            type="opt" 
            required 
            onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              variant={"outline"}
              type="submit"
              className="bg-amber-600 w-full hover:bg-amber-700 transition-colors ease-in duration-200"
              onClick={handleOtpChange}
            >
              Varify
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}