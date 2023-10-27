import {Prisma} from "@prisma/client";

export interface ExpertiseSectionType extends Prisma.ExpertiseGetPayload<{
  include: {expertises: true}
}>{}

export interface ExperienceType extends Prisma.ExperienceGetPayload<{}>{}
export interface ProfileType extends Prisma.ProfileGetPayload<{}>{}
export interface ShowcaseType extends Prisma.ShowcaseGetPayload<{
  include: {showcasePhotos: true}
}>{}
export interface ShowcasePhotoType extends Prisma.ShowcasePhotoGetPayload<{}>{}
export interface ContactType extends Prisma.ContactGetPayload<{}>{}

export interface ApiError {
  [name: string | number]: string | string[]
}
export interface ApiResponse<T> {
  code?: number,
  status?: string,
  message?: string,
  data?: null | Array<T> | T,
  errors: ApiError | string,
  myObject: Record<string, object[] | string>
}
export interface FormResult<T = any> {
  type?: string | null,
  status?: string | null,
  message?: string | null,
  response?: ApiResponse<T>,
}
