import {NextResponse} from "next/server";
import {setThemeCookie} from "@/app/actions/cookies";

export async function POST(request: Request) {
  const body = await request.json();
  const {theme} = body;

  await setThemeCookie(theme);

  return NextResponse.json({
    code: 200,
    status: 'ok',
    data: theme
  }, {status: 200})
}
