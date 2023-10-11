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

export default function Home() {
  return (
    <>
      <Header/>
      <main className="main">
        <Banner/>
        <About/>
        <Expertise/>
        <Experience/>
        <Showcase/>
        <Project/>
        <Contact/>
      </main>
      <Footer/>
      <ScrollUp />
    </>
  )
}
