import db from "@/app/libs/db";
import {API_URL} from "@/app/utility/constants";

export async function getProfile(userId: number) {
  return db.profile.findUnique({
    where: {
      userId: userId,
    },
  });
}

export async function confirmAccount(token: string) {
  const response = await fetch(`${API_URL}auth/confirm?token=${token}`, {cache: 'no-store'});
  const result = await response.json();
  if (response.ok) {
    return result?.data;
  }
  throw Error(result?.message || 'Something went wrong');
}
