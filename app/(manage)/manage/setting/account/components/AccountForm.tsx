"use client"

import React, {useState} from "react";
import {Input, InputGroup} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, UserType} from "@/app/types";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {API_URL} from "@/app/utility/constants";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {parseErrors} from "@/app/utility/helpers";

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9_.]+$/, 'Username should only alpha numeric character'),
  email: z.string().email(),
});

interface AccountFormProps {
  user: UserType
}
export const AccountForm = ({user}: AccountFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  let errors = result?.response?.errors as ApiError;

  const {
    register,
    formState: { errors: fieldErrors },
    handleSubmit
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
    disabled: isSubmitting,
  });

  const validationErrors = parseErrors(fieldErrors);
  if (!validationErrors.isValid && !errors) {
    errors = validationErrors.errors;
  }
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsSubmitting(true);
      setResult(null);
      const response = await fetch(`${API_URL}users/${user.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setResult({
          type: 'success',
          message: result?.message || 'Your account successfully updated',
        });
      } else {
        setResult({
          type: 'error',
          message: result?.message || 'Cannot update account, try again later',
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
  });

  return (
    <>
      {!isSubmitting && result?.message && (
        <Alert variant={result.type as AlertVariant} className="mb-1">
          {result.type === 'error' && <h5><i className="uil-exclamation-triangle mr-0-5"></i>Error Submit Data</h5>}
          {result.message}
        </Alert>
      )}

      <form method="post" onSubmit={onSubmit}>
        <Input
          label="Name"
          placeholder="Your name"
          id="name"
          {...register('name', {required: true})}
          errors={errors?.name}
        />
        <div className="display-grid col-md-2 column-gap-1">
          <Input
            label="Username"
            placeholder="Unique ID for login"
            id="username"
            {...register('username', {required: true})}
            errors={errors?.username}
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="Email that used to login"
            id="email"
            {...register('email')}
            errors={errors?.email}
          />
        </div>
        <InputGroup className="text-right">
          <Button type="submit" disabled={isSubmitting}>Update Profile</Button>
        </InputGroup>
      </form>
    </>
  )
}
