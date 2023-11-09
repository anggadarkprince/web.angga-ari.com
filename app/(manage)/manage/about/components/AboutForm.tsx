"use client"

import React, {ChangeEventHandler, FormEventHandler, useReducer} from "react";
import {Input, InputGroup, TextArea} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import {ApiError, FormResult, ProfileType} from "@/app/types";
import {API_URL} from "@/app/utility/constants";
import {clsx} from "clsx";
import {Alert, AlertVariant} from "@/app/components/Alert";

enum Action {
  INPUT_CHANGE = 'input-change',
  FORM_SUBMITTING = 'form-submitting',
  SUBMIT_COMPLETED = 'submit-completed',
}

interface FormState {
  form: {
    full_name?: string;
    location?: string;
    tagline?: string;
    about?: string;
    experience_years?: number | '';
    completed_projects?: number | '';
    learning_hours?: number | '';
    email_address?: string;
    website?: string;
    phone?: string;
    github_url?: string;
    github_username?: string;
    twitter_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
  }
  result?: FormResult<ProfileType> | null;
  isSubmitting: boolean,
}

interface FormAction {
  type: Action;
  payload?: object | string | number | null;
}

interface AboutFormProps {
  profile: ProfileType | null,
}

export const AboutForm = ({profile}: AboutFormProps) => {
  const [state, dispatch] = useReducer((state: FormState, action: FormAction) => {
    const { type, payload } = action;
    switch (type) {
      case Action.INPUT_CHANGE:
        const {name, value} = payload as {name: string, value: string};
        return {
          ...state,
          form: {
            ...state.form,
            [name]: value,
          }
        };
      case Action.FORM_SUBMITTING:
        return {
          ...state,
          isSubmitting: true,
          result: null,
        };
      case Action.SUBMIT_COMPLETED:
        return {
          ...state,
          isSubmitting: false,
          result: payload as FormResult,
        };
    }
    return state;
  }, {
    form: {
      full_name: profile?.fullName || '',
      location: profile?.location || '',
      tagline: profile?.tagline || '',
      about: profile?.about || '',
      experience_years: profile?.experienceYears || '',
      completed_projects: profile?.completedProjects || '',
      learning_hours: profile?.learningHours || '',
      email_address: profile?.emailAddress || '',
      website: profile?.website || '',
      phone: profile?.phone || '',
      github_url: profile?.githubUrl || '',
      github_username: profile?.githubUsername || '',
      twitter_url: profile?.twitterUrl || '',
      instagram_url: profile?.instagramUrl || '',
      linkedin_url: profile?.linkedinUrl || '',
    },
    isSubmitting: false,
  });
  const {form: formState, result, isSubmitting} = state;
  const errors = result?.response?.errors as ApiError;

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: Action.INPUT_CHANGE,
      payload: {
        name: e.target.name || e.target.id,
        value: e.target.value
      },
    });
  }

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({type: Action.FORM_SUBMITTING});
      const response = await fetch(`${API_URL}profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        dispatch({
          type: Action.SUBMIT_COMPLETED,
          payload: {
            type: 'success',
            message: 'Your profile successfully updated',
          }
        });
      } else {
        dispatch({
          type: Action.SUBMIT_COMPLETED,
          payload: {
            type: 'error',
            message: result?.message || 'Cannot update profile, try again later',
            response: result,
          }
        });
      }
    } catch (error) {
      dispatch({
        type: Action.SUBMIT_COMPLETED,
        payload: {
          type: 'error',
          message: 'Something went wrong, try again later',
        }
      });
    } finally {
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
          <legend><i className="uil-user mr-0-5"></i>Basic Profile</legend>
          <div className="display-grid col-lg-2 column-gap-2">
            <Input
              label="Full Name"
              placeholder="Full name"
              id="full_name"
              value={formState?.full_name}
              onChange={onInputChange}
              errors={errors?.full_name}
            />
            <Input
              label="Location"
              placeholder="City and country"
              id="location"
              value={formState?.location}
              onChange={onInputChange}
              errors={errors?.location}
            />
          </div>
          <Input
            label="Tagline"
            placeholder="Short tagline"
            id="tagline"
            value={formState?.tagline}
            onChange={onInputChange}
            errors={errors?.tagline}
          />
          <TextArea
            label="About"
            placeholder="Tell simple story about you"
            id="about"
            rows={3}
            value={formState?.about}
            onChange={onInputChange}
            errors={errors?.about}
          />
          <div className="display-grid col-lg-3 column-gap-2">
            <Input
              type="number"
              label="Experience Years"
              placeholder="Experience"
              id="experience_years"
              min={0}
              max={2050}
              value={formState?.experience_years}
              onChange={onInputChange}
              errors={errors?.experience_years}
            />
            <Input
              type="number"
              label="Completed Projects"
              placeholder="Project"
              id="completed_projects"
              min={0}
              max={100}
              value={formState?.completed_projects}
              onChange={onInputChange}
              errors={errors?.completed_projects}
            />
            <Input
              type="number"
              label="Learning Hours"
              placeholder="Learning"
              id="learning_hours"
              min={0}
              max={200}
              value={formState?.learning_hours}
              onChange={onInputChange}
              errors={errors?.learning_hours}
            />
          </div>
        </fieldset>
        <fieldset disabled={isSubmitting}>
          <legend><i className="uil-phone-alt mr-0-5"></i>Contacts</legend>
          <div className="display-grid col-lg-3 column-gap-2">
            <Input
              type="email"
              label="Email"
              placeholder="Email address"
              id="email_address"
              value={formState?.email_address}
              onChange={onInputChange}
              errors={errors?.email_address}
            />
            <Input
              type="url"
              label="Website"
              placeholder="Url or address"
              id="website"
              value={formState?.website}
              onChange={onInputChange}
              errors={errors?.website}
            />
            <Input
              type="tel"
              label="Phone"
              placeholder="Contact number"
              id="phone"
              value={formState?.phone}
              onChange={onInputChange}
              errors={errors?.phone}
            />
          </div>
        </fieldset>
        <fieldset disabled={isSubmitting}>
          <legend><i className="uil-github-alt mr-0-5"></i>Socials</legend>
          <div className="display-grid col-3-2 column-gap-2">
            <Input
              type="url"
              label="Github Url"
              placeholder="Github"
              id="github_url"
              value={formState?.github_url}
              onChange={onInputChange}
              errors={errors?.github_url}
            />
            <Input
              type="text"
              label="Github Username"
              placeholder="Github Username"
              id="github_username"
              value={formState?.github_username}
              onChange={onInputChange}
              errors={errors?.github_username}
            />
          </div>
          <div className="display-grid col-lg-3 column-gap-2">
            <Input
              type="url"
              label="Twitter Url"
              placeholder="Twitter"
              id="twitter_url"
              value={formState?.twitter_url}
              onChange={onInputChange}
              errors={errors?.twitter_url}
            />
            <Input
              type="url"
              label="Instagram Url"
              placeholder="Instagram"
              id="instagram_url"
              value={formState?.instagram_url}
              onChange={onInputChange}
              errors={errors?.instagram_url}
            />
            <Input
              type="url"
              label="Linkedin Url"
              placeholder="Linkedin"
              id="linkedin_url"
              value={formState?.linkedin_url}
              onChange={onInputChange}
              errors={errors?.linkedin_url}
            />
          </div>
          <InputGroup>
            <Button type="submit" disabled={isSubmitting}>Update</Button>
          </InputGroup>
        </fieldset>
      </form>
    </>
  )
}
