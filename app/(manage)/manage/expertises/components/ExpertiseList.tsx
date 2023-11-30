"use client"

import {ExpertiseSection} from "@/app/(manage)/manage/expertises/components/ExpertiseSection";
import {ExpertiseItem} from "@/app/(manage)/manage/expertises/components/ExpertiseItem";
import {ExpertiseSectionType, ExpertiseType} from "@/app/types";
import {useState} from "react";
import {ModalDelete} from "@/app/(manage)/manage/expertises/components/Modals/ModalDelete";
import {ModalSectionForm} from "@/app/(manage)/manage/expertises/components/Modals/ModalSectionForm";
import {useExpertise} from "@/app/(manage)/manage/expertises/context/ExpertiseContext";
import {useRouter} from "next/navigation";
import {API_URL} from "@/app/utility/constants";
import {ModalExpertiseForm} from "@/app/(manage)/manage/expertises/components/Modals/ModalExpertiseForm";

interface ExpertiseListProps {
  expertises: ExpertiseSectionType[],
}
export const ExpertiseList = ({expertises}: ExpertiseListProps) => {
  const [currentExpertises, setCurrentExpertises] = useState(expertises);
  const {
    showSectionForm,
    setShowSectionForm,
    showExpertiseForm,
    setShowExpertiseForm,
    section,
    setSection,
    expertise,
    setExpertise,
  } = useExpertise();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalDeleteTitle, setModalDeleteTitle] = useState('');
  const [modalDeleteLabel, setModalDeleteLabel] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sectionId, setSectionId] = useState<number | null>(null);
  const router = useRouter();

  const onShowDeleteSection = (item: ExpertiseSectionType) => {
    setShowModalDelete(true);
    setModalDeleteLabel(item.title);
    setModalDeleteTitle('Section');
    setDeleteId(item.id);
    setSection(item);
  }
  const onShowDeleteExpertise = (item: ExpertiseType) => {
    setShowModalDelete(true);
    setModalDeleteLabel(item.title);
    setModalDeleteTitle('Expertise');
    setDeleteId(item.id);
    setExpertise(item);
  }

  const onHideDeleteModal = () => {
    setShowModalDelete(false);
  }

  const onDelete = async () => {
    setIsDeleting(true);
    await fetch(`${API_URL}expertises/${deleteId}`, {
      method: 'DELETE',
      credentials: "include",
    });
    setIsDeleting(false);
    setShowModalDelete(false);
    setCurrentExpertises(currentExpertises.filter(section => {
      return section.id !== deleteId;
    }).map(section => {
      return {
        ...section,
        expertises: section.expertises.filter(expertise => expertise.id !== deleteId)
      };
    }));
  }

  const onUpdateSection = (section: ExpertiseSectionType, isCreated: boolean) => {
    setShowSectionForm(false);
    if (isCreated) {
      setCurrentExpertises([
        ...currentExpertises,
        section
      ]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      setCurrentExpertises(currentExpertises.map(item => {
        if (item.id === section.id) {
          return section;
        }
        return item;
      }));
    }
  }

  const onEditSection = (section: ExpertiseSectionType) => {
    setShowSectionForm(true);
    setSection(section);
  }

  const onAddExpertise = (sectionId: number) => {
    setSectionId(sectionId);
    setShowExpertiseForm(true);
    setExpertise(null);
  }

  const onEditExpertise = (expertise: ExpertiseType) => {
    setShowExpertiseForm(true);
    setExpertise(expertise);
    setSectionId(expertise.sectionId);
  }

  const onUpdateExpertise = (expertise: ExpertiseType, isCreated: boolean) => {
    setShowExpertiseForm(false);
    setCurrentExpertises(currentExpertises.map(item => {
      if (item.id === expertise.sectionId) {
        if (isCreated) {
          return {
            ...item,
            expertises: [...item.expertises, expertise]
          };
        } else {
          return {
            ...item,
            expertises: item.expertises.map(expertiseItem => {
              if (expertiseItem.id === expertise.id) {
                return expertise;
              }
              return expertiseItem;
            })
          };
        }
      }
      return item;
    }));
  }

  return (
    <>
      {currentExpertises.map(section => (
        <ExpertiseSection
          key={`section-${section.id}`}
          title={section.title}
          subtitle={section.subtitle}
          icon={section.icon}
          onAddExpertise={() => onAddExpertise(section.id)}
          onEdit={() => onEditSection(section)}
          onDelete={() => onShowDeleteSection(section)}
        >
          {section.expertises.map(expertise => (
            <ExpertiseItem
              key={`expertise-${expertise.id}`}
              title={expertise.title}
              subtitle={expertise.subtitle}
              level={expertise.level}
              onEdit={() => onEditExpertise(expertise)}
              onDelete={() => onShowDeleteExpertise(expertise)}
            />
          ))}
        </ExpertiseSection>
      ))}
      <ModalDelete
        show={showModalDelete}
        title={modalDeleteTitle}
        label={modalDeleteLabel}
        onClose={onHideDeleteModal}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
      <ModalSectionForm
        show={showSectionForm}
        modalTitle={`${section ? 'Edit' : 'Create'} Section`}
        section={section}
        onClose={() => setShowSectionForm(false)}
        onSuccess={onUpdateSection}
      />
      <ModalExpertiseForm
        show={showExpertiseForm}
        modalTitle={`${expertise ? 'Edit' : 'Create'} Expertise`}
        sectionId={sectionId}
        expertise={expertise}
        onClose={() => setShowExpertiseForm(false)}
        onSuccess={onUpdateExpertise}
      />
    </>
  )
}
