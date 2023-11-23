import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {getLoggedUserId} from "@/app/actions/user";
import {getExpertises} from "@/app/actions/expertise";
import {Suspense} from "react";
import {ExpertiseList} from "@/app/(manage)/manage/expertises/components/ExpertiseList";
import {ExpertiseSectionButton} from "@/app/(manage)/manage/expertises/components/ExpertiseSectionButton";
import {ExpertiseContextProvider} from "@/app/(manage)/manage/expertises/context/ExpertiseContext";

export default async function Expertises() {
  const userId = await getLoggedUserId();
  const expertises = await getExpertises(userId!);

  return (
    <ExpertiseContextProvider>
      <div className="display-flex flex-justify-between align-item-center">
        <PageTitle title="Expertise" subtitle="My technical skills" className="mb-1"/>
        <ExpertiseSectionButton />
      </div>
      {expertises && (
        <Suspense fallback={<p>Loading expertises...</p>}>
          <ExpertiseList expertises={expertises} />
        </Suspense>
      )}
    </ExpertiseContextProvider>
  );
}
