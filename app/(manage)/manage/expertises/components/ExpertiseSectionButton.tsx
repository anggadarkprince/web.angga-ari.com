"use client"

import {Button} from "@/app/components/Buttons";
import {useExpertise} from "@/app/(manage)/manage/expertises/context/ExpertiseContext";

export const ExpertiseSectionButton = () => {
  const {showSectionForm, setShowSectionForm, setSection} = useExpertise();

  return (
    <Button variant={"success"} onClick={() => {
      setShowSectionForm(!showSectionForm);
      setSection(null);
    }}>
      Create<i className="uil-file-alt ml-0-5"></i>
    </Button>
  )
}
