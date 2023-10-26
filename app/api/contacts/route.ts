import db from "@/app/libs/db";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body)
  const {name, email, project, message} = body;

  const contact = await db.contact.create({
    data: {
      name: name,
      email: email,
      project: project,
      message: message,
    }
  });

  return NextResponse.json({
    code: 200,
    status: 'ok',
    data: contact
  }, {status: 200})
}
