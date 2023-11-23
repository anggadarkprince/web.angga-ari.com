import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {Input, InputGroup, TextArea} from "@/app/components/Inputs";
import {ApiError, ExpertiseType, FormResult} from "@/app/types";
import React, {FormEventHandler, useEffect, useState} from "react";
import {API_URL} from "@/app/utility/constants";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {useExpertise} from "@/app/(manage)/manage/expertises/context/ExpertiseContext";
import {Radio} from "@/app/components/Radio/Radio";

interface ModalExpertiseFormProps {
  show: boolean;
  modalTitle: string;
  sectionId?: number | null;
  expertise?: ExpertiseType | null;
  onClose: () => void;
  onSuccess?: (data: ExpertiseType) => void;
}
export const ModalExpertiseForm = ({show, modalTitle, sectionId, expertise, onClose, onSuccess}: ModalExpertiseFormProps) => {
  const {setExpertise} = useExpertise();
  const [title, setTitle] = useState(expertise?.title || '');
  const [subtitle, setSubtitle] = useState(expertise?.subtitle || '');
  const [level, setLevel] = useState(expertise?.level || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const errors = result?.response?.errors as ApiError;

  useEffect(() => {
    setTitle(expertise?.title || '');
    setSubtitle(expertise?.subtitle || '');
    setLevel(expertise?.level || 0);
  }, [expertise]);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const path = expertise?.id ? `/${expertise.id}` : '';
      const httpMethod = expertise?.id ? 'PATCH' : 'POST';
      const response = await fetch(`${API_URL}expertises${path}`, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section_id: sectionId,
          title,
          subtitle,
          level,
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setResult({
          type: 'success',
          message: result?.message || `Expertise is successfully ${expertise?.id ? 'updated' : 'created'}`,
        });
        setTitle('');
        setSubtitle('');
        setLevel(0);
        onSuccess && onSuccess(result.data);
      } else {
        setResult({
          type: 'error',
          message: result?.message || `Cannot ${expertise?.id ? 'update' : 'create'} expertise, try again later`,
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
    setExpertise(null);
    onClose && onClose();
  }

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
              label={"Expertise"}
              placeholder={"Expertise title"}
              required={true}
              value={title}
              onChange={e => setTitle(e.target.value)}
              errors={errors?.title}
            />
            <TextArea
              label={"Subtitle"}
              placeholder={"Expertise description"}
              required={true}
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              errors={errors?.subtitle}
            />
            <InputGroup>
              {Array.from(Array(5).keys()).map(index => {
                return (
                  <Radio
                    key={`level-${index + 1}`}
                    label={(index + 1).toString()}
                    name={"level"}
                    value={index + 1}
                    onChange={e => setLevel(+e.target.value)}
                    checked={level === (index + 1)}
                    id={`level-${index + 1}`}
                    required={true}
                  />
                );
              })}
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant={"white"} onClick={onModalClose}>Cancel</Button>
            <Button type={"submit"} variant={"success"}>
              {expertise ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </fieldset>
      </form>
    </Modal>
  )
}
