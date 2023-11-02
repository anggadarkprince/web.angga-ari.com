"use client"

import {clearAccessToken} from "@/app/actions/cookies";
import {useRouter} from "next/navigation";
import {Button} from "@/app/components/Buttons";

export default async function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await clearAccessToken();
    router.push('/login');
  }

  return (
    <div>
      Dashboard
      <Button type="button" onClick={logout}>Logout</Button>
    </div>
  )
}
