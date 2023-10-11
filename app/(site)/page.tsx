"use client";

import {Header} from "@/app/(site)/components/Header/Header";
import {Banner} from "@/app/(site)/components/Banner/Banner";
import {About} from "@/app/(site)/components/About/About";
import {Expertise} from "@/app/(site)/components/Expertise/Expertise";
import {Experience} from "@/app/(site)/components/Experience/Experience";
import {Showcase} from "@/app/(site)/components/Showcase/Showcase";
import {Project} from "@/app/(site)/components/Project/Project";
import {Contact} from "@/app/(site)/components/Contact/Contact";
import {Footer} from "@/app/(site)/components/Footer/Footer";
import {ScrollUp} from "@/app/(site)/components/ScrollUp/ScrollUp";
import {useRef} from "react";

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  return (
    <>
      <Header sections={[homeRef, aboutRef, expertiseRef, experienceRef, showcaseRef, contactRef]}/>
      <main className="main">
        <Banner ref={homeRef}/>
        <About ref={aboutRef}/>
        <Expertise ref={expertiseRef}/>
        <Experience ref={experienceRef}/>
        <Showcase ref={showcaseRef}/>
        <Contact ref={contactRef}/>
      </main>
      <Footer/>
      <ScrollUp />
    </>
  )
}
