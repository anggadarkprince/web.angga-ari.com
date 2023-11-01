"use client";

import styles from './LandingPage.module.css';
import {Header} from "@/app/(site)/components/Header/Header";
import {Banner} from "@/app/(site)/components/Banner/Banner";
import {About} from "@/app/(site)/components/About/About";
import {Expertise} from "@/app/(site)/components/Expertise/Expertise";
import {Experience} from "@/app/(site)/components/Experience/Experience";
import {Showcase} from "@/app/(site)/components/Showcase/Showcase";
import {Contact} from "@/app/(site)/components/Contact/Contact";
import {Footer} from "@/app/(site)/components/Footer/Footer";
import {ScrollUp} from "@/app/(site)/components/ScrollUp/ScrollUp";
import {useRef} from "react";
import {ExperienceType, ExpertiseSectionType, ProfileType, ShowcaseType} from "@/app/types";

interface LandingPageProps {
  profile: ProfileType | null,
  expertises: ExpertiseSectionType[],
  experiences: ExperienceType[],
  showcases: ShowcaseType[],
}

export const LandingPage = ({profile, experiences, expertises, showcases}: LandingPageProps) => {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <Header sections={[homeRef, aboutRef, expertiseRef, experienceRef, showcaseRef, contactRef]} profile={profile}/>
      <main className={styles.main}>
        <Banner ref={homeRef} profile={profile}/>
        <About ref={aboutRef} profile={profile}/>
        <Expertise ref={expertiseRef} expertises={expertises}/>
        <Experience ref={experienceRef} experiences={experiences}/>
        <Showcase ref={showcaseRef} showcases={showcases}/>
        <Contact ref={contactRef} profile={profile}/>
      </main>
      <Footer profile={profile}/>
      <ScrollUp />
    </>
  )
}
