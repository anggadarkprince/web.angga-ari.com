"use client"

import {clearAccessToken} from "@/app/actions/cookies";
import {useRouter} from "next/navigation";

export default async function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await clearAccessToken();
    router.push('/login');
  }
  return (
    <div>
      Dashboard
      <button className="button" onClick={logout}>Logout</button>
    </div>
  )
}
