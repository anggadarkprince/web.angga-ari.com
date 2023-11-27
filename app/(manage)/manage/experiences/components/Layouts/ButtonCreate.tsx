"use client"

import {Button} from "@/app/components/Buttons";
import {useExperience} from "@/app/(manage)/manage/experiences/context/ExperienceContext";

export const ButtonCreate = () => {
  const {setShowModalForm} = useExperience();
  return (
    <Button variant={"success"} onClick={() => setShowModalForm(true)}>
      Create<i className="uil-file-alt ml-0-5"></i>
    </Button>
  )
}
