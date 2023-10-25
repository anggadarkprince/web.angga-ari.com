import db from "@/app/libs/db";

export async function getExperiences(userId: number) {
  return db.experience.findMany({
    where: {
      userId: userId,
    },
  });
}
