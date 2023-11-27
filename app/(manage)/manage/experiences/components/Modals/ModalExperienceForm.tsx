import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {Input} from "@/app/components/Inputs";
import {ApiError, ExperienceType, FormResult} from "@/app/types";
import React, {FormEventHandler, useEffect, useState} from "react";
import {API_URL} from "@/app/utility/constants";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {dateFormat} from "@/app/utility/helpers";
import {DatePicker} from "@/app/components/DatePicker";

interface FormPayloadType {
  label: string;
  title: string;
  subtitle: string;
  url: string;
  from: string;
  to: string;
}
interface ModalExperienceFormProps {
  show: boolean;
  modalTitle: string;
  experience?: ExperienceType | null;
  onClose?: () => void;
  onSuccess?: (data: ExperienceType, isCreated: boolean) => void;
  onSubmit?: (data: FormPayloadType) => void;
}
export const ModalExperienceForm = ({show, modalTitle, experience, onClose, onSuccess}: ModalExperienceFormProps) => {
  const [label, setLabel] = useState(experience?.title || '');
  const [title, setTitle] = useState(experience?.title || '');
  const [subtitle, setSubtitle] = useState(experience?.subtitle || '');
  const [url, setUrl] = useState(experience?.url || '');
  const [from, setFrom] = useState(dateFormat(experience?.from || '', 'yyyy-MM-dd') || '');
  const [to, setTo] = useState(dateFormat(experience?.to || '', 'yyyy-MM-dd') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const errors = result?.response?.errors as ApiError;

  useEffect(() => {
    setLabel(experience?.label || '');
    setTitle(experience?.title || '');
    setSubtitle(experience?.subtitle || '');
    setUrl(experience?.url || '');
    setFrom(dateFormat(experience?.from || '', 'yyyy-MM-dd') || '');
    setTo(dateFormat(experience?.to || '', 'yyyy-MM-dd') || '');
  }, [experience]);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const isCreated = !experience;
      const path = experience?.id ? `/${experience.id}` : '';
      const httpMethod = experience?.id ? 'PATCH' : 'POST';
      const response = await fetch(`${API_URL}experiences${path}`, {
        method: httpMethod,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          label,
          title,
          subtitle,
          url: url ? url : null,
          from,
          to,
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setResult({
          type: 'success',
          message: result?.message || `Experience is successfully ${experience ? 'updated' : 'created'}`,
        });
        setLabel('');
        setTitle('');
        setSubtitle('');
        setUrl('');
        setFrom('');
        setTo('');
        onSuccess && onSuccess(result.data, isCreated);
      } else {
        setResult({
          type: 'error',
          message: result?.message || `Cannot ${experience ? 'update' : 'create'} expertise experience, try again later`,
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
              label={"Label"}
              placeholder={"Eg. High school, Full time working"}
              value={label}
              onChange={e => setLabel(e.target.value)}
              errors={errors?.label}
            />
            <Input
              label={"Title"}
              placeholder={"Experience title"}
              required={true}
              value={title}
              onChange={e => setTitle(e.target.value)}
              errors={errors?.title}
            />
            <Input
              label={"Subtitle"}
              placeholder={"Experience description"}
              required={true}
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              errors={errors?.subtitle}
            />
            <Input
              label={"Url"}
              type={"url"}
              placeholder={"Experience url"}
              value={url}
              onChange={e => setUrl(e.target.value)}
              errors={errors?.url}
            />
            <div className={"display-grid col-2 column-gap-2"}>
              <DatePicker
                label={"From"}
                placeholder={"Date from"}
                required={true}
                id={"date-from"}
                value={from}
                onChange={e => setFrom(e.target.value)}
                errors={errors?.from}
              />
              <DatePicker
                label={"To (Empty for \"now\")"}
                placeholder={"Date to"}
                id={"date-to"}
                value={to}
                onChange={e => setTo(e.target.value)}
                isClearable={true}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={"white"} onClick={onModalClose}>Cancel</Button>
            <Button type={"submit"} variant={"success"}>
              {experience ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </fieldset>
      </form>
    </Modal>
  )
}
