import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {AboutForm} from "@/app/(manage)/manage/about/components/AboutForm";
import {getProfile} from "@/app/actions/profile";
import {getLoggedUserId} from "@/app/actions/user";

export default async function About() {
  const userId = await getLoggedUserId();
  const profile = await getProfile(userId || 0);

  return (
    <>
      <PageTitle title="About" subtitle="Short description about me" className="mb-1" />
      <AboutForm profile={profile}/>
    </>
  )
}
