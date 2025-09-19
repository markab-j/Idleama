import { type Languege, LanguegeSchema } from "@core/schema/lang.schema";
import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import i18next from "i18next";

export async function i18nInitialize(): Promise<void> {
  const ko = await getLangJson("ko");

  await i18next.init<Languege>({
    lng: "ko",
    resources: {
      ko: { translation: ko },
    },
  });
  const keys = Object.keys(ko);

  keys.forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = i18next.t(key);
    }
  });
}

async function getLangJson(lang: string) {
  const json = await readTextFile(`lang/${lang}.json`, {
    baseDir: BaseDirectory.Resource,
  });

  console.log(json);

  return LanguegeSchema.parse(json);
}
