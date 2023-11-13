"use client"

import React, {FormEventHandler, useState} from "react";
import {Input, InputGroup} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, UserType} from "@/app/types";
import {API_URL} from "@/app/utility/constants";
import {Alert, AlertVariant} from "@/app/components/Alert";

export const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult<UserType> | null>(null);
  const errors = result?.response?.errors as ApiError;

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const response = await fetch(`${API_URL}users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
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

      <form method="post" onSubmit={onSubmit}>
        <fieldset disabled={isSubmitting}>
          <Input
            type="password"
            label="Current Password"
            placeholder="Old password"
            id="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            errors={errors?.currentPassword}
          />
          <div className="display-grid col-md-2 column-gap-1">
            <Input
              type="password"
              label="New Password"
              placeholder="New password"
              id="new_password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              errors={errors?.newPassword}
            />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm password"
              id="confirm_password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              errors={errors?.confirmPassword}
            />
          </div>
          <InputGroup className="text-right">
            <Button type="submit" variant="danger" disabled={isSubmitting}>Change Password</Button>
          </InputGroup>
        </fieldset>
      </form>
    </>
  )
}
