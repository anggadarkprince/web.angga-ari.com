import 'server-only'

import db from "@/app/libs/db";

export async function getExpertises(userId: number) {
  return db.expertise.findMany({
    where: {
      userId: userId,
      sectionId: null,
    },
    include: {expertises: true}
  });
}
