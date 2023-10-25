import db from "@/app/libs/db";

export async function getShowcases(userId: number) {
  return db.showcase.findMany({
    where: {
      userId: userId,
    },
    include: {showcasePhotos: true}
  });
}
