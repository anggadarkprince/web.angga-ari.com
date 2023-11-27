import {getLoggedUserId} from "@/app/actions/user";
import {getExperiences} from "@/app/actions/experience";
import {ExperienceList} from "@/app/(manage)/manage/experiences/components/Layouts/ExperienceList";

export const ExperiencePage = async () => {
  const userId = await getLoggedUserId();
  const experiences = await getExperiences(userId!);
  return (
    <ExperienceList experiences={experiences} />
  )
}
