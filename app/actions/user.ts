import db from "@/app/libs/db";
import {cookies} from "next/headers";
import * as jwt from "jose";

export async function getUser(id: number) {
  return db.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getLoggedUserId() {
  const accessToken = cookies().get("access_token")?.value;
  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      const decoded = await jwt.jwtVerify(accessToken, secret);
      if (decoded && decoded.payload?.sub) {
        return +decoded.payload.sub;
      } else {
        throw new AuthenticationError("Empty decoded access token");
      }
    } catch(error) {
      if (error instanceof Error) {
        throw new AuthenticationError(error.message);
      } else if (typeof error === "string") {
        throw new AuthenticationError(error);
      }
      throw new AuthenticationError();
    }
  }
}

export async function getLoggedUser() {
  const userId = await getLoggedUserId();

  return await getUser(userId || 0);
}
