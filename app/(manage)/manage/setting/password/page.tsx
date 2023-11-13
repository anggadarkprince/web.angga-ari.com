import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {PasswordForm} from "@/app/(manage)/manage/setting/password/components/PasswordForm";

export default async function Password() {
  return (
    <>
      <PageTitle title="Password" subtitle="Change your password" className="mb-1" />
      <PasswordForm/>
    </>
  );
}
