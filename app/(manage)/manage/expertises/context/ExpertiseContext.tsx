"use client"

import {createContext, PropsWithChildren, useContext, useState} from "react";
import {ExpertiseSectionType, ExpertiseType} from "@/app/types";

export const ExpertiseContext = createContext<{
  showSectionForm: boolean,
  setShowSectionForm: (value: boolean) => void,
  showExpertiseForm: boolean,
  setShowExpertiseForm: (value: boolean) => void,
  section: ExpertiseSectionType | null,
  setSection: (value: ExpertiseSectionType | null) => void,
  expertise: ExpertiseType | null,
  setExpertise: (value: ExpertiseType | null) => void,
}>({
  showSectionForm: false,
  setShowSectionForm: () => {},
  showExpertiseForm: false,
  setShowExpertiseForm: () => {},
  section: null,
  setSection: () => {},
  expertise: null,
  setExpertise: () => {},
});

export function ExpertiseContextProvider({children}: PropsWithChildren) {
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showExpertiseForm, setShowExpertiseForm] = useState(false);
  const [section, setSection] = useState<ExpertiseSectionType | null>(null);
  const [expertise, setExpertise] = useState<ExpertiseType | null>(null);

  return (
    <ExpertiseContext.Provider value={{
      showSectionForm,
      setShowSectionForm,
      showExpertiseForm,
      setShowExpertiseForm,
      section,
      setSection,
      expertise,
      setExpertise,
    }}>
      {children}
    </ExpertiseContext.Provider>
  );
}

export const useExpertise = () => {
  const context = useContext(ExpertiseContext);

  if (context === undefined) {
    throw new Error('useExpertise was used outside of its Provider');
  }

  return context;
};
