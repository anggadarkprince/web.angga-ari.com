"use client"

import {createContext, PropsWithChildren, useContext, useState} from "react";

export const ExperienceContext = createContext<{
  showModalForm: boolean,
  setShowModalForm: (value: boolean) => void,
}>({
  showModalForm: false,
  setShowModalForm: () => {},
});

export function ExperienceContextProvider({children}: PropsWithChildren) {
  const [showModalForm, setShowModalForm] = useState(false);

  return (
    <ExperienceContext.Provider value={{showModalForm, setShowModalForm}}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => {
  const context = useContext(ExperienceContext);

  if (context === undefined) {
    throw new Error('useExperience was used outside of its Provider');
  }

  return context;
};
