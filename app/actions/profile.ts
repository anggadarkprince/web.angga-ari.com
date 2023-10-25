import db from "@/app/libs/db";

export async function getProfile(userId: number) {
  return db.profile.findUnique({
    where: {
      userId: userId,
    },
  });
}
