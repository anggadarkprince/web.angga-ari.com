import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {Input, TextArea} from "@/app/components/Inputs";
import {ApiError, ExpertiseSectionType, FormResult} from "@/app/types";
import React, {FormEventHandler, useEffect, useState} from "react";
import {API_URL} from "@/app/utility/constants";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {useExpertise} from "@/app/(manage)/manage/expertises/context/ExpertiseContext";
import icons from "@/app/utility/icons";
import parse from 'html-react-parser';

interface ModalSectionFormProps {
  show: boolean;
  modalTitle: string;
  section?: ExpertiseSectionType | null;
  onClose: () => void;
  onSuccess?: (data: ExpertiseSectionType, isCreated: boolean) => void;
}
export const ModalSectionForm = ({show, modalTitle, section, onClose, onSuccess}: ModalSectionFormProps) => {
  const {setSection} = useExpertise();
  const [title, setTitle] = useState(section?.title || '');
  const [subtitle, setSubtitle] = useState(section?.subtitle || '');
  const [searchIcon, setSearchIcon] = useState(section?.icon || '');
  const [icon, setIcon] = useState(section?.icon || '');
  const [filteredIcons, setFilteredIcons] = useState(icons || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const errors = result?.response?.errors as ApiError;

  useEffect(() => {
    setTitle(section?.title || '');
    setSubtitle(section?.subtitle || '');
    setIcon(section?.icon || '');
  }, [section]);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const isCreated = !section?.id;
      const path = section?.id ? `/${section.id}` : '';
      const httpMethod = section?.id ? 'PATCH' : 'POST';
      const response = await fetch(`${API_URL}expertises${path}`, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          icon
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setResult({
          type: 'success',
          message: result?.message || `Expertise section is successfully ${section?.id ? 'updated' : 'created'}`,
        });
        setTitle('');
        setSubtitle('');
        setIcon('');
        onSuccess && onSuccess(result.data, isCreated);
      } else {
        setResult({
          type: 'error',
          message: result?.message || `Cannot ${section?.id ? 'update' : 'create'} expertise section, try again later`,
          response: result,
        });
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Something went wrong, try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const onModalClose = () => {
    setSection(null);
    onClose && onClose();
  }

  useEffect(() => {
    setFilteredIcons(icons.filter(iconName => iconName.includes(searchIcon)))
  }, [searchIcon]);

  return (
    <Modal show={show}>
      <form method="post" onSubmit={onSubmit}>
        <fieldset disabled={isSubmitting}>
          <ModalHeader title={modalTitle} icon={"uil-file-alt"} onClose={onModalClose}/>
          <ModalBody>
            {!isSubmitting && result?.message && result.type === 'error' && (
              <Alert variant={result.type as AlertVariant} className="mb-1">
                {result.message}
              </Alert>
            )}
            <Input
              label={"Section Title"}
              placeholder={"Section title"}
              required={true}
              value={title}
              onChange={e => setTitle(e.target.value)}
              errors={errors?.title}
            />
            <TextArea
              label={"Subtitle"}
              placeholder={"Section description"}
              required={true}
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              errors={errors?.subtitle}
            />
            <Input
              label={parse(`Icon: <strong>${icon}</strong>`) || undefined}
              inputSize={"small"}
              placeholder={"Search section icon"}
              value={searchIcon}
              icon={"uil-search"}
              borderless={true}
              onChange={e => setSearchIcon(e.target.value)}
              errors={errors?.icon}
            />
            <div className={"mb-1"}>
              <div className={"display-grid col-6 gap-1 pr-1"} style={{maxHeight: 200, overflowY: 'auto'}}>
                {filteredIcons.map(iconClass => {
                  return (
                    <Button
                      key={iconClass}
                      variant={iconClass == icon ? "primary" : "white"}
                      size={"large"} className="text-h3"
                      autoHeight={true} onClick={() => setIcon(iconClass)}
                    >
                      <i className={iconClass}></i>
                    </Button>
                  )
                })}
              </div>
              {filteredIcons.length === 0 && <p className="text-fade text-small text-center">No icon found with keyword <strong>"{searchIcon}"</strong></p>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={"white"} onClick={onModalClose}>Cancel</Button>
            <Button type={"submit"} variant={"success"}>
              {section ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </fieldset>
      </form>
    </Modal>
  )
}
