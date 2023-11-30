import {NextResponse} from "next/server";
import {setSidebarCollapseCookie} from "@/app/actions/cookies";

export async function POST(request: Request) {
  const body = await request.json();
  const {collapse} = body;

  await setSidebarCollapseCookie(collapse);

  return NextResponse.json({
    code: 200,
    status: 'ok',
    data: {collapse}
  }, {status: 200})
}
