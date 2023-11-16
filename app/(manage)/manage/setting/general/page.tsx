import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {SettingForm} from "@/app/(manage)/manage/setting/general/components/SettingForm";
import {getSettings} from "@/app/actions/setting";
import {Suspense} from "react";

export default async function General() {
  const settings = await getSettings();

  return (
    <>
      <PageTitle title="Setting" subtitle="General setting & app preferences" className="mb-1" />
      {settings && (
        <Suspense fallback={<p>Loading settings...</p>}>
          <SettingForm settings={settings}/>
        </Suspense>)
      }
    </>
  );
}
