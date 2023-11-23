import {NextResponse} from "next/server";
import {clearThemeCookie} from "@/app/actions/cookies";

export async function POST() {
  await clearThemeCookie();

  return NextResponse.json(null, {status: 200})
}
