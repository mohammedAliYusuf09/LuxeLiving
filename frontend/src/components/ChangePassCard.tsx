import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { notifyError, notifySuccess } from "@/lib/tostCollection";
import type { ResetPassword } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";


export function ChangePassCard() {
  const navigate = useNavigate();
    const [form, setFrom] = useState<ResetPassword>({
      oldPassword: "",
      newPassword: ""
    });

    const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFrom((prev: ResetPassword) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }

  const resetPassword = async () => {
    console.log(form);
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `http://localhost:3000/api/v1/agent/reset-password`,
      form
    );
    return response.data;
  }

  const queryClient = useQueryClient();
   
  const { mutate } = useMutation({
      mutationFn: resetPassword,
      onSuccess: (responseData) => {
        
        // Optionally refetch or update query cache
        queryClient.invalidateQueries({ queryKey: ["ResetPassword"] });
        setFrom({
          oldPassword: "",
          newPassword: ""
        })
      notifySuccess(responseData.message);
      navigate("/settings")
      },
      onError: (error:AxiosError) => {
        notifyError(error.message || "An error occurred");
        // notify(error.message || "An error occurred");
      },
  });

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  }
  return (
    <Card className="w-full max-w-sm bg-[#171717]">
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Provide your old password and new password
        </CardDescription>
         <CardAction>
          <span className="text-white text-lg"
          onClick={() => navigate(-1)}>
            <TfiClose />
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="oldPassword">Old Password</label>
              <Input
                id="oldPassword"
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                required
                onChange={handelChange}
              />
            </div>
            <div className="grid gap-2">
                <label htmlFor="newPassword">Password</label>
              <Input 
              id="newPassword" 
              type="password" 
              name="newPassword"
              value={form.newPassword}
              required
              onChange={handelChange} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
        type="submit" 
        variant="outline" 
        className="bg-[#3a3838] hover:bg-[#292323]"
        onClick={handelSubmit}
        >
          Reset Password
        </Button>
      </CardFooter>
    </Card>
  )
}
