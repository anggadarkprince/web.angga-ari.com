import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {ButtonCreate} from "@/app/(manage)/manage/experiences/components/Layouts/ButtonCreate";
import {ExperienceContextProvider} from "@/app/(manage)/manage/experiences/context/ExperienceContext";
import {ExperiencePage} from "@/app/(manage)/manage/experiences/components/Layouts/ExperiencePage";
import {Suspense} from "react";

export default async function Experience() {
  return (
    <ExperienceContextProvider>
      <div className="display-flex flex-justify-between align-item-center">
        <PageTitle title="Expertise" subtitle="My technical skills" className="mb-1"/>
        <ButtonCreate/>
      </div>
      <Suspense fallback={"Loading experiences..."}>
        <ExperiencePage/>
      </Suspense>
    </ExperienceContextProvider>
  );
}
