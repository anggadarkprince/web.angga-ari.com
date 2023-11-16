"use client"

import React, {FormEventHandler, useState} from "react";
import {Input, InputGroup} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, UserType} from "@/app/types";
import {Alert, AlertVariant} from "@/app/components/Alert";
import {API_URL} from "@/app/utility/constants";

interface AccountFormProps {
  user: UserType
}
export const AccountForm = ({user}: AccountFormProps) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const errors = result?.response?.errors as ApiError;

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setResult(null);
      const response = await fetch(`${API_URL}users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email
        }),
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
            label="Name"
            placeholder="Your name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            errors={errors?.name}
          />
          <div className="display-grid col-md-2 column-gap-1">
            <Input
              label="Username"
              placeholder="Unique ID for login"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              errors={errors?.username}
            />
            <Input
              type="email"
              label="Email Address"
              placeholder="Email that used to login"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              errors={errors?.email}
            />
          </div>
          <InputGroup className="text-right">
            <Button type="submit" disabled={isSubmitting}>Update Profile</Button>
          </InputGroup>
        </fieldset>
      </form>
    </>
  )
}
