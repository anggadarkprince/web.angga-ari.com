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
