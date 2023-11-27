"use client"

import {ApiResponse, ExperienceType} from "@/app/types";
import {ExperienceItem} from "@/app/(manage)/manage/experiences/components/Layouts/ExperienceItem";
import React, {useEffect, useState} from "react";
import {useExperience} from "@/app/(manage)/manage/experiences/context/ExperienceContext";
import {ModalDelete} from "@/app/(manage)/manage/experiences/components/Modals/ModalDelete";
import {API_URL} from "@/app/utility/constants";
import {ModalExperienceForm} from "@/app/(manage)/manage/experiences/components/Modals/ModalExperienceForm";

interface ExperienceListProps {
  experiences: ExperienceType[]
}
export const ExperienceList = ({experiences}: ExperienceListProps) => {
  const {showModalForm, setShowModalForm} = useExperience();
  const [currentExperiences, setCurrentExperiences] = useState(experiences);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [activeExperience, setActiveExperience] = useState<ExperienceType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      const fetchExperiences = async () => {
        const results = await fetch(`${API_URL}experiences`, {
          credentials: "include",
        });
        const response = await results.json() as ApiResponse<ExperienceType[]>;
        setCurrentExperiences(response.data || []);
        setIsRefreshing(false);
      }
      fetchExperiences();
    }
  }, [isRefreshing]);

  const onFormSubmitted = () => {
    setIsRefreshing(true);
    closeModals();
  }

  const onEdit = (experience: ExperienceType) => {
    setActiveExperience(experience);
    setShowModalForm(true);
  }

  const onDeleteConfirmation = (experience: ExperienceType) => {
    setActiveExperience(experience);
    setShowModalDelete(true);
  }

  const onDelete = async () => {
    setIsDeleting(true);
    await fetch(`${API_URL}experiences/${activeExperience?.id}`, {
      method: 'DELETE',
      credentials: "include",
    });
    setIsDeleting(false);
    setIsRefreshing(true);
    closeModals();
  }

  const closeModals = () => {
    setShowModalDelete(false);
    setShowModalForm(false);
    setActiveExperience(null);
  }

  return (
    <>
      <div className="display-grid col-lg-2 gap-1">
        {currentExperiences.map(item => {
          return (
            <ExperienceItem
              key={`experience-${item.id}`}
              title={item.title}
              label={item.label}
              subtitle={item.subtitle}
              from={item.from}
              to={item.to}
              onEdit={() => onEdit(item)}
              onDelete={() => onDeleteConfirmation(item)}
            />
          )
        })}
      </div>
      <ModalExperienceForm
        show={showModalForm}
        modalTitle={`${activeExperience ? 'Edit' : 'Create'} Experience`}
        experience={activeExperience}
        onClose={closeModals}
        onSuccess={onFormSubmitted}
      />
      <ModalDelete
        show={showModalDelete}
        isDeleting={isDeleting}
        label={activeExperience?.title}
        onClose={closeModals}
        onDelete={onDelete}
      />
    </>
  )
}
