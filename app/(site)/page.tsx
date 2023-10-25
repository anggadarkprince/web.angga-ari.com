import {DEFAULT_PROFILE} from "@/app/utility/constants";
import {getExpertises} from "@/app/actions/expertise";
import {LandingPage} from "@/app/(site)/components/LandingPage";
import {getExperiences} from "@/app/actions/experience";
import {getProfile} from "@/app/actions/profile";
import {getShowcases} from "@/app/actions/showcase";

export default async function Home() {
  const profile = await getProfile(DEFAULT_PROFILE);
  const experiences = await getExperiences(DEFAULT_PROFILE);
  const expertises = await getExpertises(DEFAULT_PROFILE);
  const showcases = await getShowcases(DEFAULT_PROFILE);

  return (
    <LandingPage
      profile={profile}
      expertises={expertises}
      experiences={experiences}
      showcases={showcases}
    />
  )
}
