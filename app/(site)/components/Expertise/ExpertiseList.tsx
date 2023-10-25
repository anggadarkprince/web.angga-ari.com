import {getExpertises} from "@/app/actions/expertise";
import {DEFAULT_PROFILE} from "@/app/utility/constants";
import {ExpertiseSection} from "@/app/(site)/components/Expertise/ExpertiseSection";

export const ExpertiseList = async () => {
  const expertises = await getExpertises(DEFAULT_PROFILE);
  return (
    <>
      {expertises.map(expertise => (
        <ExpertiseSection
          key={expertise.title}
          title={expertise.title}
          subtitle={expertise.subtitle}
          icon={expertise.icon}
          expertises={expertise.expertises} />
      ))}
    </>
  )
}
