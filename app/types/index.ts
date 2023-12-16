import {Prisma} from "@prisma/client";

export interface ExpertiseSectionType extends Prisma.ExpertiseGetPayload<{
  include: {expertises: true}
}>{}
export interface ExpertiseType extends Prisma.ExpertiseGetPayload<{}>{}

export interface ExperienceType extends Prisma.ExperienceGetPayload<{}>{}
export interface ProfileType extends Prisma.ProfileGetPayload<{}>{}
export interface ShowcaseType extends Prisma.ShowcaseGetPayload<{
  include: {showcasePhotos: true}
}>{}
export interface ShowcasePhotoType extends Prisma.ShowcasePhotoGetPayload<{}>{}
export interface ContactType extends Prisma.ContactGetPayload<{}>{}
export interface UserType extends Prisma.UserGetPayload<{}>{}

export interface ApiError {
  [name: string | number]: string | string[]
}
export interface ApiResponse<T = null> {
  code?: number,
  status?: string,
  message?: string,
  data?: T,
  errors: ApiError | string,
  myObject: Record<string, object[] | string>
}
export interface FormResult<T = any> {
  type?: string | null,
  status?: string | null,
  message?: string | null,
  response?: ApiResponse<T>,
}

export interface SettingKeyValueType extends Prisma.SettingGetPayload<{}>{}
export interface SettingType {
  title: string;
  url: string;
  author: string;
  keywords: string;
  description: string;
}

export type VariantType = 'primary' | 'success' | 'danger' | 'error' | 'warning' | 'info' | 'white';
export type SizeType = 'small' | 'medium' | 'large';

export interface PaginationMetaType {
  page: number;
  limit: number;
  total_item: number;
  total_page: number;
  has_prev: boolean;
  has_next: boolean;
}