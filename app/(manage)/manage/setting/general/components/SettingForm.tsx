"use client"

import React, {FormEventHandler, useState} from "react";
import {Input, InputGroup, TextArea} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, SettingType} from "@/app/types";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {API_URL} from "@/app/utility/constants";

interface SettingFormProps {
  settings: SettingType
}
export const SettingForm = ({settings}: SettingFormProps) => {
  const [title, setTitle] = useState(settings.title);
  const [author, setAuthor] = useState(settings.author);
  const [url, setUrl] = useState(settings.url);
  const [keywords, setKeywords] = useState(settings.keywords);
  const [description, setDescription] = useState(settings.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const errors = result?.response?.errors as ApiError;

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const response = await fetch(`${API_URL}settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          url,
          keywords,
          description,
        }),
        credentials: "include",
      });
      const result = await response.json();
      console.log(response.ok)
      if (response.ok) {
        setResult({
          type: 'success',
          message: result?.message || 'Setting successfully updated',
        });
      } else {
        setResult({
          type: 'error',
          message: result?.message || 'Cannot update setting, try again later',
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      {!isSubmitting && result?.message && (
        <Alert variant={result.type as AlertVariant} className="mb-1">
          {result.type === 'error' && <h5><i className="uil-exclamation-triangle mr-0-5"></i>Error Submit Data</h5>}
          {result.message}
        </Alert>
      )}

      <form method="post" onSubmit={onSubmit}>
        <fieldset disabled={isSubmitting}>
          <legend>Basic Profile</legend>
          <Input
            label="Title"
            placeholder="Website title"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            errors={errors?.title}
          />
          <div className="display-grid col-md-2 column-gap-1">
            <Input
              label="Author"
              placeholder="Author name"
              id="author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              errors={errors?.author}
            />
            <Input
              type="url"
              label="Url"
              placeholder="Website url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              errors={errors?.url}
            />
          </div>
          <Input
            type="text"
            label="Keywords"
            placeholder="Website keywords"
            id="keywords"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            errors={errors?.keywords}
          />
          <TextArea
            label="Description"
            placeholder="Website description"
            id="description"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            errors={errors?.about}
          />
          <InputGroup className="text-right">
            <Button type="submit" disabled={isSubmitting}>Update Profile</Button>
          </InputGroup>
        </fieldset>
      </form>
    </>
  )
}
