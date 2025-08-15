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
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";


export function ChangePassCard() {
    const navigate = useNavigate();
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
              <label htmlFor="old-password">Old Password</label>
              <Input
                id="old-password"
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
                <label htmlFor="password">Password</label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" variant="outline" className="bg-[#3a3838] hover:bg-[#292323]">
          Reset Password
        </Button>
      </CardFooter>
    </Card>
  )
}
