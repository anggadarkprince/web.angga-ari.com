import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {AccountForm} from "@/app/(manage)/manage/setting/account/components/AccountForm";
import {getLoggedUser} from "@/app/actions/user";

export default async function Account() {
  const user = await getLoggedUser();

  return (
    <>
      <PageTitle title="Account" subtitle="User account information" className="mb-1" />
      {user && <AccountForm user={user}/>}
    </>
  );
}
