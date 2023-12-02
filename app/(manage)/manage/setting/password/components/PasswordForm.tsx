"use client"

import React, {useState} from "react";
import {Input, InputGroup} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, UserType} from "@/app/types";
import {API_URL} from "@/app/utility/constants";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import * as z from "zod";

const schema = z.object({
  currentPassword: z.string().min(1, 'Current password is required').max(50),
  newPassword: z.string().min(1, 'New password is required').max(50),
  confirmPassword: z.string().min(1, 'Confirm password is required').max(50),
});

export const PasswordForm = () => {
  const defaultValues = {currentPassword: '', newPassword: '', confirmPassword: ''};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult<UserType> | null>(null);
  const errors = result?.response?.errors as ApiError;

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async (formData, form) => {
    try {
      setIsSubmitting(true);
      setResult(null);
      const response = await fetch(`${API_URL}users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        form.setValue('currentPassword', '');
        form.setValue('newPassword', '');
        form.setValue('confirmPassword', '');
        setResult({
          type: 'success',
          message: result?.message || 'Your password successfully updated',
        });
      } else {
        setResult({
          type: 'error',
          message: result?.message || 'Cannot update password, try again later',
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

      <Form onSubmit={onSubmit} schema={schema} disabled={isSubmitting} defaultValues={defaultValues}>
        <Input
          type="password"
          label="Current Password"
          placeholder="Old password"
          id="password"
          name={"currentPassword"}
          errors={errors?.currentPassword}
        />
        <div className="display-grid col-md-2 column-gap-1">
          <Input
            type="password"
            label="New Password"
            placeholder="New password"
            id="new_password"
            name={"newPassword"}
            errors={errors?.newPassword}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            id="confirm_password"
            name={"confirmPassword"}
            errors={errors?.confirmPassword}
          />
        </div>
        <InputGroup className="text-right">
          <Button type="submit" variant="danger" disabled={isSubmitting}>Change Password</Button>
        </InputGroup>
      </Form>
    </>
  )
}
