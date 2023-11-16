import db from "@/app/libs/db";
import {SettingType} from "@/app/types";

export async function getSettings(key?: string) {
  const settings = await db.setting.findMany();
  return settings.reduce((carry: SettingType, item) => {
    carry[item.key as keyof SettingType] = item.value;
    return carry;
  }, <SettingType>{});
}

export async function getSetting(key?: string, defaultValue?: any) {
  const setting = await db.setting.findUnique({
    where: {
      key: key,
    },
  });
  if (setting) {
    return setting.value;
  } else {
    return defaultValue;
  }
}
